const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // Add a webpack rule so `.ts` files (and `<script lang="ts">` in .vue files)
  // are handled by ts-loader. Vue CLI projects that already have TypeScript
  // support typically add this automatically; adding it here ensures the
  // project will compile `.ts` modules without a separate `vue add typescript`.
  chainWebpack: config => {
    // ensure .ts/.tsx are resolved
    config.resolve.extensions.add('.ts').add('.tsx')

    // Add ts-loader rule and make it process <script lang="ts"> inside .vue files
    const rule = config.module.rule('ts')
    rule.test(/\.ts$|\.tsx$/)
      .use('ts-loader')
      .loader('ts-loader')
      .tap(options => Object.assign(options || {}, { 
        appendTsSuffixTo: [/\.vue$/],
        // transpileOnly: true skips type-checking during webpack compilation,
        // making hot reload faster and preventing webpack from failing on type errors.
        // Type checking can still be done separately with `tsc --noEmit` or a separate plugin.
        transpileOnly: true
      }))
  }
})
