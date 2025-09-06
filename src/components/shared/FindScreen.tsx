import { useState } from "react";

import FindView from './FindView';
import FindRide from './FindRide';

export default function FindScreen() {
    const [pickup, setPickup] = useState<any>(null);
    const [dropoff, setDropoff] = useState<any>(null);

    function planRide() {
        console.log("بدء الرحلة من", pickup, "إلى", dropoff);
    }

    function resetRide() {
        setPickup(null);
        setDropoff(null);
    }

    return (
        <div className="relative w-full h-full">
            {!pickup || !dropoff ? (
                <FindRide
                    
                    pickup={pickup}
                    setPickup={setPickup}
                    dropoff={dropoff}
                    setDropoff={setDropoff}
                    onClose={resetRide}
                />
            ) : (
                <FindView
                
                    pickup={pickup}
                    dropoff={dropoff}
                    planRide={planRide}
                    onClose={resetRide}
                />
            )}
        </div>
    );
}
