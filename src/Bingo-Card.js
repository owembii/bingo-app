// Bingo-Card.js
import React, { useState, useEffect } from 'react';

function BingoCard() {
  const [bingoData, setBingoData] = useState(null);

  useEffect(() => {
    // Fetch the bingo card data from the URL
    const fetchData = async () => {
      try {
        const response = await fetch('http://www.hyeumine.com/getcard.php?bcode=HEelhJos');
        if (response.ok) {
          const data = await response.json();
          setBingoData(data.card);
        } else {
          console.error('Failed to fetch bingo card data');
        }
      } catch (error) {
        console.error('Error fetching bingo card data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bingo-card">
      {bingoData && (
        <div>
          <h2>BINGO Card</h2>
          <table>
            <thead>
              <tr>
                <th>B</th>
                <th>I</th>
                <th>N</th>
                <th>G</th>
                <th>O</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4].map((index) => (
                <tr key={index}>
                  <td>{bingoData.B[index]}</td>
                  <td>{bingoData.I[index]}</td>
                  <td>{bingoData.N[index]}</td>
                  <td>{bingoData.G[index]}</td>
                  <td>{bingoData.O[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BingoCard;
