import { useState } from "react";
import './App.css';

function App() {
  const [scoopLimit, setScoopLimit] = useState(5);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [flavors, setFlavors] = useState([
    {
      name: 'Vanilla',
      isSoldOut: false,
      scoopsSelected: 0
    },
    {
      name: 'Chocolate',
      isSoldOut: false,
      scoopsSelected: 0
    },
    {
      name: 'Strawberry',
      isSoldOut: false,
      scoopsSelected: 0
    },
    {
      name: 'Pistachio',
      isSoldOut: true,
      scoopsSelected: 0
    }
  ])

  const addScoop = (flavorName) => {

    const flavor = flavors.find((flavor) => flavor.name === flavorName)
    if (flavor.isSoldOut) {
      return
    }

    const total = flavors.reduce(
      (sum, flavor) => sum + flavor.scoopsSelected, 0
    );

    if (total >= scoopLimit) {
      return;
    }

    setFlavors(
      flavors.map((flavor) =>
        flavor.name === flavorName
          ? {
            ...flavor,
            scoopsSelected: flavor.scoopsSelected + 1
          }
          : flavor
      )
    );
  };

  const removeScoop = (flavorName) => {
    setFlavors(
      flavors.map((flavor) =>
        flavor.name === flavorName && flavor.scoopsSelected > 0
          ? {
            ...flavor,
            scoopsSelected: flavor.scoopsSelected - 1
          }
          : flavor
      )
    );
  };

  const totalScoops = flavors.reduce(
    (sum, flavor) => sum + flavor.scoopsSelected,
    0
  );

  const displayedFlavors = showOnlyAvailable
    ? flavors.filter((flavor) => !flavor.isSoldOut)
    : flavors;

  return (
    <div>
      <h1>Ice-Cream Kiosk</h1>
      <button onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}>
        {showOnlyAvailable ? 'Show All Flavors' : 'Show Available Only'}
      </button>
      <div className="flavors-grid">
        
        {displayedFlavors.map((flavor) => (

          <div key={flavor.name} className="flavor-card">
            <h2>{flavor.name}</h2>
            {flavor.isSoldOut && <span>Sold Out</span>}
            <p>{flavor.scoopsSelected}</p>
            <button onClick={() => addScoop(flavor.name)}> + </button>
            <button onClick={() => removeScoop(flavor.name)}> - </button>
          </div>

        ))}

      </div>
      <div>

        {totalScoops >= scoopLimit && (
          <p>You have reached the scoop limit!</p>
        )}
        {totalScoops === 0 && (
          <p>Your order is empty. Add some ice cream!</p>
        )}

        <h2>Order Summary</h2>
        <p>Total scoops: {totalScoops}</p>
        <p>Remaining scoops: {scoopLimit - totalScoops}</p>
      </div>
    </div>
  )
}
export default App;