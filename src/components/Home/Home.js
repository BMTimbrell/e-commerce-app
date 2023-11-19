import React from 'react';
import './Home.css';

function Home() {

    return (
        <main className="main__home">
            <section className="section">
                <h2 className="section__heading">Best Place To Buy Shoes</h2>
                <p className="section__text">
                    Shop at the best shoe store with the best offers!
                </p>
            </section>
            <section className="section">
                <h2 className="section__heading">Why Shop With Us?</h2>
                <p className="section__text">
                    We are the best. We have the best deals and most splendid shoes!
                </p>
            </section>
            <section className="section">
                <h2 className="section__heading">Don't Miss Our Amazing Offers!</h2>
                <p className="section__text">
                    Some shoes are 5% off - only for a limited time!
                </p>
            </section>
            
        </main>
    );
}

export default Home;