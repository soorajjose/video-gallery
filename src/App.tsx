import * as React from 'react'
import './css/tailwind.css'
import  Dashboard  from './components/dashboard'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import getGalleryListReducer from './reducers/gallery-reducers'


const store = createStore(getGalleryListReducer)


class App extends React.Component {
  render() {
    return (
      <div className="h-full w-full bg-black">
        <Provider store={store}><Dashboard /></Provider>
      </div>
    );
  }
}

export default App;
