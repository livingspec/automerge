Fixes a bug in webpack worker wasm import by patching the index.js file.

NOTE: Use patches instead of the build when ready. At the time of writing patches could not be applied to nested packages in yarn 2. See https://github.com/yarnpkg/berry/pull/2466