import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Home from './src/pages/Home';
import Products from './src/pages/Products';
import Account from './src/pages/Account';

const App = () => {
    return (
        <Router>
            <Header />
                <main>
                    <Switch >
                        <Route exact path="/" component={Home} />
                        <Route path="/products" component={Products} />
                        <Route path="/account" component={Account} />
                    </Switch >
                </main>
            <Footer />
        </Router>
    );
};

export default App;