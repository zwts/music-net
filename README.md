### BUILD

1. Clone project to `gaia/apps/`
2. Add "app/music-net" in `gaia/build/config/phone/apps-engineering.list` & `build/config/phone/apps-production.list`
3. Run `APP=music-net make`
4. Push Application into device first time(? -> shi.tan)
5. Make install `APP=music-net make install-gaia` any time when code updated.


### Configurations

#### package.json
- @babel/core @babel/preset-env @babel/preset-react

#### webpack.config.prod.js

#### jest.config.js

#### .kaios
#### .babelrc



### Test
#### Jest
- jest test react connect component [DOC](https://www.robinwieruch.de/react-connected-component-test)
- not sure this libs is useful

    "enzyme": "^3.11.0",
    "enzyme-adapter-react-16": "^1.15.5",
    "enzyme-to-json": "^3.6.1",

- "react-test-renderer"

- "redux-mock-store": use for mock redux store

- fileMock and styleMock not sure useful


