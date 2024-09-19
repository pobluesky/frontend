import React from 'react';
import { Offer_Sheet_Terms } from '../../assets/css/Form.css';

function Terms() {
    const termSample = ['CIF', 'CIP', 'FOB', 'CIP'];
    const destSample = ['Busan seaport', 'Incheon Airport'];

    return (
        <div className={Offer_Sheet_Terms}>
            <div>
                <select name="selectedTerm" defaultValue="">
                    {termSample.map((term, termIdx) => (
                        <option key={termIdx} value={term}>
                            {term}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <select name="selectedDest" defaultValue="">
                    {destSample.map((dest, destIdx) => (
                        <option key={destIdx} value={dest}>
                            {dest}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Terms;
