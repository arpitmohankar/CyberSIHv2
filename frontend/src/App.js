import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import store from './redux/store';
import IncidentList from './components/IncidentList';
import Visualization from './components/Visualization';
import Layout from './components/Layout';
import Laws from './components/Laws';
import Articles from './components/Articles';
import Feed from './components/Feed';
import Services from './components/Services';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>  
            <Route exact path="/" element={<Layout />} />  
            <Route path="/incidents" element={<IncidentList />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/Laws" element={<Laws />} />
            <Route path="/Articles" element={<Articles />} />
            <Route path="/Feed" element={<Feed />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Chatbot" element={<Chatbot />} />


          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;