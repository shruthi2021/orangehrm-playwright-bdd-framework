module.exports = {
  default: {
    require: [
       "src/world/**/*.ts",
      "src/step-definitions/**/*.ts",
      "src/hooks/**/*.ts"
    ],
    paths: [
     // "features/**/*.feature"
      "features/recruit/vacancy.feature"
    ],
    requireModule: [
      "ts-node/register"
    ],
    format: [
      "progress-bar"
    ]
  }
};