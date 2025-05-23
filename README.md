This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Notes

I am using react app rewired, and a config-overrides.js file, in the root, 

to configure @react-spring
 to work, when i was receiving the following errors on netlify, to handle the question marks, (under new babel loader standards) --> 

 ./node_modules/@react-spring/core/dist/react-spring_core.legacy-esm.js 110:11
8:58:41 PM: Module parse failed: Unexpected token (110:11)
8:58:41 PM: File was processed with these loaders:
8:58:41 PM:  * ./node_modules/babel-loader/lib/index.js
8:58:41 PM: You may need an additional loader to handle the result of these loaders.
8:58:41 PM: | 
8:58:41 PM: | function detachRefs(ctrl, ref) {
8:58:41 PM: >   ctrl.ref?.delete(ctrl);
8:58:41 PM: |   ref?.delete(ctrl);
8:58:41 PM: | }

IF STYLING IS STILL NOT WORKING, RUN NPM RUN BUILD AND UPLOAD TO YOUR HOSTING SITE MANUALLY.


-- Dagogo Uranta Clinton  - Nov 26 2024