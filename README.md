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



### ROUTER

lib: "react-router-dom": "^5.2.0"

1. `exact`

   To prevent unexpect path match, like `/` will be matched when we path name push `/play`.

   ## [exact: bool](https://reactrouter.com/web/api/Route/exact-bool)

   When `true`, will only match if the path matches the `location.pathname` *exactly*.

   ```jsx
   <Route exact path="/one">
     <About />
   </Route>
   ```

   |  path  | location.pathname |  exact  | matches? |
   | :----: | :---------------: | :-----: | :------: |
   | `/one` |    `/one/two`     | `true`  |    no    |
   | `/one` |    `/one/two`     | `false` |   yes    |

2. `<Redirect />`

   default KaiOS app location will be `app://music-net.gaiamobile.org/index.html`, use `<Redirect />` will let location change to `app://music-net.gaiamobile.org/` as wish to show `Home`

### FOCUS

current we set focus when component did mount callback, not sure if it suitable.

```js
  componentDidMount() {
    this.focus();
  }

  focus() {
    this.element.focus();
  }
```



