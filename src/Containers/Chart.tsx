import React, { useEffect, useState } from "react";
// import SideMenu from "../Components/SideMenu";
// import ContactList from "../Components/ContactList";
// import ContactForm from "../Components/ContactForm";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
function Chart() {
  // const [showSideBar, setShowSideBar] = useState(true);
  // const [active, setActive] = useState("discussion");
  // const [createContact, setcreateContact] = useState(false);

  const [countriesData, setcountriesData] = useState([]);

  // const toggleSideBar = () => {
  //   setShowSideBar(!showSideBar);
  // };

  // const toggleCreateContact = () => {
  //   setcreateContact(!createContact);
  // };

  interface Country {
    country: string;
    countryInfo: {
      lat: number;
      _id: number;
      long: number;
      flag: string;
    };
    active: number;
    recovered: number;
    deaths: number;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          "https://disease.sh/v3/covid-19/countries"
        );
        if (!response1.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response1.json();

        setcountriesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <SideMenu showSideBar={showSideBar} toggleSideBar={toggleSideBar} /> */}
      <MapContainer
        center={[33, 65]}
        zoom={5}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {countriesData.map((country) => (
          <Marker
            key={(country as Country)?.countryInfo?._id}
            position={[
              (country as Country)?.countryInfo?.lat,
              (country as Country)?.countryInfo?.long,
            ]}
          >
            <Popup>
              <img src={(country as Country)?.countryInfo?.flag} alt="country image" /> <br />
              CountryName: <b>{(country as Country)?.country}</b> <br />
              Active Cases :<b>{(country as Country)?.active}</b> <br />
              Recovered Cases :<b>{(country as Country)?.recovered}</b> <br />
              Deaths :<b>{(country as Country)?.deaths}</b> <br />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default Chart;
