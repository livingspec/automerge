import * as wasm from './index_bg.wasm';

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
* @returns {any}
*/
export function init() {
    var ret = wasm.init();
    return takeObject(ret);
}

/**
* @param {any} input
* @returns {Array<any>}
*/
export function getHeads(input) {
    var ret = wasm.getHeads(addHeapObject(input));
    return takeObject(ret);
}

/**
* @param {any} input
*/
export function free(input) {
    wasm.free(addHeapObject(input));
}

/**
* @param {any} input
* @param {any} change
* @returns {any}
*/
export function applyLocalChange(input, change) {
    var ret = wasm.applyLocalChange(addHeapObject(input), addHeapObject(change));
    return takeObject(ret);
}

/**
* @param {any} input
* @param {Array<any>} changes
* @returns {any}
*/
export function applyChanges(input, changes) {
    var ret = wasm.applyChanges(addHeapObject(input), addHeapObject(changes));
    return takeObject(ret);
}

/**
* @param {any} input
* @param {Array<any>} changes
* @returns {any}
*/
export function loadChanges(input, changes) {
    var ret = wasm.loadChanges(addHeapObject(input), addHeapObject(changes));
    return takeObject(ret);
}

/**
* @param {any} data
* @returns {any}
*/
export function load(data) {
    var ret = wasm.load(addHeapObject(data));
    return takeObject(ret);
}

/**
* @param {any} input
* @returns {any}
*/
export function getPatch(input) {
    var ret = wasm.getPatch(addHeapObject(input));
    return takeObject(ret);
}

/**
* @param {any} input
* @returns {any}
*/
export function clone(input) {
    var ret = wasm.clone(addHeapObject(input));
    return takeObject(ret);
}

/**
* @param {any} input
* @returns {any}
*/
export function save(input) {
    var ret = wasm.save(addHeapObject(input));
    return takeObject(ret);
}

/**
* @param {any} input
* @param {any} have_deps
* @returns {any}
*/
export function getChanges(input, have_deps) {
    var ret = wasm.getChanges(addHeapObject(input), addHeapObject(have_deps));
    return takeObject(ret);
}

/**
* @param {any} input
* @returns {any}
*/
export function getAllChanges(input) {
    var ret = wasm.getAllChanges(addHeapObject(input));
    return takeObject(ret);
}

/**
* @param {any} input
* @returns {any}
*/
export function getMissingDeps(input) {
    var ret = wasm.getMissingDeps(addHeapObject(input));
    return takeObject(ret);
}

/**
* @param {any} input
* @param {JsSyncState} sync_state
* @returns {any}
*/
export function generateSyncMessage(input, sync_state) {
    _assertClass(sync_state, JsSyncState);
    var ret = wasm.generateSyncMessage(addHeapObject(input), sync_state.ptr);
    return takeObject(ret);
}

/**
* @param {any} input
* @param {JsSyncState} sync_state
* @param {any} message
* @returns {any}
*/
export function receiveSyncMessage(input, sync_state, message) {
    _assertClass(sync_state, JsSyncState);
    var ret = wasm.receiveSyncMessage(addHeapObject(input), sync_state.ptr, addHeapObject(message));
    return takeObject(ret);
}

/**
* @returns {JsSyncState}
*/
export function initSyncState() {
    var ret = wasm.initSyncState();
    return JsSyncState.__wrap(ret);
}

/**
* @param {JsSyncState} sync_state
* @returns {any}
*/
export function encodeSyncState(sync_state) {
    _assertClass(sync_state, JsSyncState);
    var ret = wasm.encodeSyncState(sync_state.ptr);
    return takeObject(ret);
}

/**
* @param {any} sync_state_bytes
* @returns {JsSyncState}
*/
export function decodeSyncState(sync_state_bytes) {
    var ret = wasm.decodeSyncState(addHeapObject(sync_state_bytes));
    return JsSyncState.__wrap(ret);
}

/**
* @param {any} sync_message
* @returns {any}
*/
export function encodeSyncMessage(sync_message) {
    var ret = wasm.encodeSyncMessage(addHeapObject(sync_message));
    return takeObject(ret);
}

/**
* @param {any} sync_message_bytes
* @returns {any}
*/
export function decodeSyncMessage(sync_message_bytes) {
    var ret = wasm.decodeSyncMessage(addHeapObject(sync_message_bytes));
    return takeObject(ret);
}

function handleError(f) {
    return function () {
        try {
            return f.apply(this, arguments);

        } catch (e) {
            wasm.__wbindgen_exn_store(addHeapObject(e));
        }
    };
}
/**
*/
export class JsSyncState {

    static __wrap(ptr) {
        const obj = Object.create(JsSyncState.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jssyncstate_free(ptr);
    }
    /**
    * @returns {any}
    */
    get sharedHeads() {
        var ret = wasm.jssyncstate_sharedHeads(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get lastSentHeads() {
        var ret = wasm.jssyncstate_lastSentHeads(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {any} heads
    */
    set lastSentHeads(heads) {
        wasm.jssyncstate_set_lastSentHeads(this.ptr, addHeapObject(heads));
    }
    /**
    * @param {any} hashes
    */
    set sentHashes(hashes) {
        wasm.jssyncstate_set_sentHashes(this.ptr, addHeapObject(hashes));
    }
}
/**
*/
export class State {

    static __wrap(ptr) {
        const obj = Object.create(State.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_state_free(ptr);
    }
}

export const __wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

export const __wbindgen_json_parse = function(arg0, arg1) {
    var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export const __wbindgen_json_serialize = function(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = JSON.stringify(obj === undefined ? null : obj);
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbg_jssyncstate_new = function(arg0) {
    var ret = JsSyncState.__wrap(arg0);
    return addHeapObject(ret);
};

export const __wbg_new_ab8c409fa5da73b2 = function() {
    var ret = new Object();
    return addHeapObject(ret);
};

export const __wbg_setheads_e09c34780514be5a = function(arg0, arg1) {
    getObject(arg0).heads = takeObject(arg1);
};

export const __wbg_setfrozen_c6af04af0fd3f847 = function(arg0, arg1) {
    getObject(arg0).frozen = arg1 !== 0;
};

export const __wbg_setstate_ca28681744953036 = function(arg0, arg1) {
    getObject(arg0).state = State.__wrap(arg1);
};

export const __wbg_heads_cf661e9bc9495ca2 = function(arg0) {
    var ret = getObject(arg0).heads;
    return addHeapObject(ret);
};

export const __wbg_frozen_0a95986462f47b20 = function(arg0) {
    var ret = getObject(arg0).frozen;
    return ret;
};

export const __wbg_state_6774d9a5de1b814a = function(arg0) {
    var ret = getObject(arg0).state;
    _assertClass(ret, State);
    var ptr0 = ret.ptr;
    ret.ptr = 0;
    return ptr0;
};

export const __wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export const __wbindgen_object_clone_ref = function(arg0) {
    var ret = getObject(arg0);
    return addHeapObject(ret);
};

export const __wbindgen_is_null = function(arg0) {
    var ret = getObject(arg0) === null;
    return ret;
};

export const __wbindgen_is_undefined = function(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

export const __wbg_new_68adb0d58759a4ed = function() {
    var ret = new Object();
    return addHeapObject(ret);
};

export const __wbg_set_2e79e744454afade = function(arg0, arg1, arg2) {
    getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
};

export const __wbindgen_is_object = function(arg0) {
    const val = getObject(arg0);
    var ret = typeof(val) === 'object' && val !== null;
    return ret;
};

export const __wbg_String_60c4ba333b5ca1c6 = function(arg0, arg1) {
    var ret = String(getObject(arg1));
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbg_get_f099d98ea7d68360 = function(arg0, arg1) {
    var ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
};

export const __wbg_length_450572e01ae27466 = function(arg0) {
    var ret = getObject(arg0).length;
    return ret;
};

export const __wbindgen_is_function = function(arg0) {
    var ret = typeof(getObject(arg0)) === 'function';
    return ret;
};

export const __wbg_next_af8c20b8c0d81345 = function(arg0) {
    var ret = getObject(arg0).next;
    return addHeapObject(ret);
};

export const __wbg_next_9d10ccb28a5fd327 = handleError(function(arg0) {
    var ret = getObject(arg0).next();
    return addHeapObject(ret);
});

export const __wbg_done_faa42c8d1dd8ca9e = function(arg0) {
    var ret = getObject(arg0).done;
    return ret;
};

export const __wbg_value_9befa7ab4a7326bf = function(arg0) {
    var ret = getObject(arg0).value;
    return addHeapObject(ret);
};

export const __wbg_iterator_de2adb40693c8c47 = function() {
    var ret = Symbol.iterator;
    return addHeapObject(ret);
};

export const __wbg_get_0c6963cbab34fbb6 = handleError(function(arg0, arg1) {
    var ret = Reflect.get(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
});

export const __wbg_call_cb478d88f3068c91 = handleError(function(arg0, arg1) {
    var ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
});

export const __wbg_new_8528c110a833413f = function() {
    var ret = new Array();
    return addHeapObject(ret);
};

export const __wbg_isArray_bccef1135dd559c1 = function(arg0) {
    var ret = Array.isArray(getObject(arg0));
    return ret;
};

export const __wbg_push_17a514d8ab666103 = function(arg0, arg1) {
    var ret = getObject(arg0).push(getObject(arg1));
    return ret;
};

export const __wbg_unshift_ccf0fc64a2d0c607 = function(arg0, arg1) {
    var ret = getObject(arg0).unshift(getObject(arg1));
    return ret;
};

export const __wbg_instanceof_ArrayBuffer_ee6a79eaea0f4f5b = function(arg0) {
    var ret = getObject(arg0) instanceof ArrayBuffer;
    return ret;
};

export const __wbg_values_0e37ea0767d5caba = function(arg0) {
    var ret = getObject(arg0).values();
    return addHeapObject(ret);
};

export const __wbg_new_7031805939a80203 = function(arg0, arg1) {
    var ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export const __wbg_buffer_ebc6c8e75510eae3 = function(arg0) {
    var ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

export const __wbg_newwithbyteoffsetandlength_ca3d3d8811ecb569 = function(arg0, arg1, arg2) {
    var ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export const __wbg_length_317f0dd77f7a6673 = function(arg0) {
    var ret = getObject(arg0).length;
    return ret;
};

export const __wbg_new_135e963dedf67b22 = function(arg0) {
    var ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

export const __wbg_set_4a5072a31008e0cb = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

export const __wbg_instanceof_Uint8Array_d7349a138407a31e = function(arg0) {
    var ret = getObject(arg0) instanceof Uint8Array;
    return ret;
};

export const __wbg_byteLength_7d55aca7ec6c42cb = function(arg0) {
    var ret = getObject(arg0).byteLength;
    return ret;
};

export const __wbindgen_number_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = typeof(obj) === 'number' ? obj : undefined;
    getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
};

export const __wbindgen_string_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbindgen_boolean_get = function(arg0) {
    const v = getObject(arg0);
    var ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

export const __wbindgen_debug_string = function(arg0, arg1) {
    var ret = debugString(getObject(arg1));
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export const __wbindgen_rethrow = function(arg0) {
    throw takeObject(arg0);
};

export const __wbindgen_memory = function() {
    var ret = wasm.memory;
    return addHeapObject(ret);
};

