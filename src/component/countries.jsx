// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./countries.style.css";

// export default function Countries() {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [timer, timerFn] = useState(null);
//   const [listData, setListData] = useState([]);

//   const debounceSearch = (event, debounceTimeout) => {
//     clearTimeout(debounceTimeout);
//     let tId = setTimeout(() => {
//       console.log(event.target.value);
//       setSearch(event.target.value);
//     }, 500);
//     timerFn(tId);
//   };

//   useEffect(() => {
//     let NewArray = [];
      
//     data.forEach((ele) => {
//           if(ele.name.common.toLowerCase().includes(search.toLowerCase())) {
//               NewArray.push(ele)
//             }
//         })
//     setListData([...NewArray])
//   }, [search]);


//   useEffect(() => {
//     async function onload() {
//       await axios
//         .get("https://restcountries.com/v3.1/all")
//         .then((data) => {
//           console.log(data.data);
//           setData(data.data);
//           setListData(data.data)
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//     onload();
//   }, []);

//   const Card = ({ img, alt, name }) => {
//     return (
//       <div className="Card">
//         <img src={img} alt={alt} className="CardImage" />
//         <h3 className="CardName">{name}</h3>
//       </div>
//     );
//   };


//   return (
//     <>
//       <div className="nav">
//         <input
//           type="text"
//           className="input"
//           placeholder="Search for countries..."
//           onChange={(e) => {
//             debounceSearch(e, timer);
//           }}
//         />
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexWrap: "wrap",
//         }}
//       >
//         {listData.map((ele) => (
//           <Card
//             key={ele.car.cca3}
//             img={ele.flags.png}
//             alt={ele.flags.alt}
//             name={ele.name.common}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./countries.style.css";

export default function Countries() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [listData, setListData] = useState([]);

  // Debounce search input
  const debounceSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  // Update filtered list based on search
  useEffect(() => {
    if (search === "") {
      setListData(data);
    } else {
      const filteredData = data.filter((ele) =>
        ele.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setListData(filteredData);
    }
  }, [search, data]);

  // Load country data on component mount
  useEffect(() => {
    async function onload() {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setData(response.data);
        setListData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    onload();
  }, []);

  // Card component for each country
  const Card = ({ img, alt, name }) => (
    <div className="Card">
      <img src={img} alt={alt} className="CardImage" />
      <h3 className="CardName">{name}</h3>
    </div>
  );

  return (
    <>
      <div className="nav">
        <input
          type="text"
          className="input"
          placeholder="Search for countries..."
          onChange={debounceSearch}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {listData.map((ele) => (
          <Card
            key={ele.cca3} // corrected key property
            img={ele.flags.png}
            alt={ele.flags.alt}
            name={ele.name.common}
          />
        ))}
      </div>
    </>
  );
}
