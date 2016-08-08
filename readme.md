== Simple guide for front end automatic packages ==

1) Install node js

2) Copy package.json (node packages) and bower.json (bower frondend packages) from this project

3) Run `npm install` , It's will install all packages gulp + gulp plugins defined in the package.json and bower

4) Run `bower install`, It'w will install all bower packages defined in bower.js.

5) Run `gulp build` it's will make global js and css files with all plugins defined in the bower js

6) All paths can be changes in gulpfile.js