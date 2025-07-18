'use client'

import React, {useState} from "react"
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Filter from "@/components/Filter";

export default function Get() {
  const [addFilterCol, setAddFilterCol] = useState("");
  const [drNum, setDrNum] = useState("");
  const [drNumVis, setDrNumVis] = useState(true);
  const [dateOcc, setDateOcc] = useState("");
  const [dateOccVis, setDateOccVis] = useState(true);
  const [areaName, setAreaName] = useState("");
  const [areaNameVis, setAreaNameVis] = useState(true);
  const [status, setStatus] = useState("");
  const [recordData, setRecordData] = useState([{
    dr_num: "211507896",
    time: {
      date_reported: "04/11/2021",
      date_occurred: "11/07/2020",
      time_occurred: "0845"
    },
    area: {
      area_code: "15",
      area_name: "N Hollywood"
    },
    crime: {
      crime_code: "354",
      crime_desc: "THEFT OF IDENTITY"
    },
    victim: {
      age: "31",
      sex: "M",
      race: "H"
    },
    weapon: {
      weapon_code: "",
      weapon_desc: ""
    },
    coordinates: {
      latitude: "34.2124",
      longitude: "-118.4092"
    }
  },
  {
    dr_num: "201516622",
    time: {
      date_reported: "10/21/2022",
      date_occurred: "07/23/2021",
      time_occurred: "1145"
    },
    area: {
      area_code: "14",
      area_name: "Pacific"
    },
    crime: {
      crime_code: "230",
      crime_desc: "ASSAULT WITH DEADLY WEAPON, AGGRAVATED ASSAULT"
    },
    victim: {
      age: "32",
      sex: "F",
      race: "W"
    },
    weapon: {
      weapon_code: "200",
      weapon_desc: "KNIFE WITH BLADE 6INCHES OR LESS"
    },
    coordinates: {
      latitude: "34.1994",
      longitude: "-118.4203"
    }
  }
]);

  const updateAddFilterCol = (event: SelectChangeEvent) => {
    console.log("Setting to " + event.target.value);
    setAddFilterCol(event.target.value);
  }

  const addNewFilterCol = () => {
    if (addFilterCol == "DR Num") {
      setDrNumVis(true);
    } else if (addFilterCol == "Date Occurred") {
      setDateOccVis(true);
    } else if (addFilterCol == "Area Name") {
      setAreaNameVis(true);
    }
  }

  const handleGetRecords = async () => {
    if ((drNum === "" && drNumVis) ||
        (dateOcc === "" && dateOccVis) ||
        (areaName === "" && areaNameVis)) {
      return;
    }

    try {
      const requestBody = {
          "dr_num": drNum,
          "date_occurred": dateOcc,
          "area_name": areaName
      }

      const response = await fetch("http://localhost:8080/get_records", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();

        setRecordData([data]);

        console.log(data);
        setStatus("Success");
      } else {
        console.error("Error getting records")
        setStatus("Error");
      }
    } catch (error) {
      console.error("Error: ", error);
      setStatus("Error");
    }
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="m-5">
        <p className="font-bold text-lg">
          Add Filter
        </p>
        <div className="flex justify-center items-center border border-black p-2 rounded-lg">
          <IconButton 
            aria-label="add" 
            color="success"
            onClick={addNewFilterCol}
          >
            <AddCircleOutlineIcon/>
          </IconButton>
          <FormControl fullWidth>
            <InputLabel id="addFilterCol-label">Filter Column</InputLabel>
            <Select
              labelId="addFilterCol-label"
              value={addFilterCol}
              label="Filter Column"
              onChange={updateAddFilterCol}
            >
              <MenuItem value={"DR Num"}>DR Num</MenuItem>
              {/* <MenuItem>Date Reported</MenuItem> */}
              <MenuItem value={"Date Occurred"}>Date Occurred</MenuItem>
              {/* <MenuItem>Time Occurred</MenuItem>
              <MenuItem>Area Code</MenuItem> */}
              <MenuItem value={"Area Name"}>Area Name</MenuItem>
              {/* <MenuItem>Crime Code</MenuItem>
              <MenuItem>Crime Description</MenuItem>
              <MenuItem>Victim Age</MenuItem>
              <MenuItem>Sex</MenuItem>
              <MenuItem>Race</MenuItem>
              <MenuItem>Weapon Code</MenuItem>
              <MenuItem>Weapon Description</MenuItem>
              <MenuItem>Latitude</MenuItem>
              <MenuItem>Longitude</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <p className="font-bold text-lg mt-2">
          Filters
        </p>
        {
          drNumVis &&
          <Filter
            filterCol="DR Num"
            filterVal={drNum}
            setFilterVal={setDrNum}
            setFilterVis={setDrNumVis}
          />
        }
        {
          dateOccVis &&
          <Filter
            filterCol="Date Occurred"
            filterVal={dateOcc}
            setFilterVal={setDateOcc}
            setFilterVis={setDateOccVis}
          />
        }
        {
          areaNameVis &&
          <Filter
            filterCol="Area Name"
            filterVal={areaName}
            setFilterVal={setAreaName}
            setFilterVis={setAreaNameVis}
          />
        }
        
      </div>
      
      <div className="flex justify-center items-center">
        <button className="bg-black text-white p-2 rounded-lg mb-3 text-lg" onClick={() => handleGetRecords()}>
          Get Records
        </button>
        {/* <input 
          className="bg-white text-black border border-black p-2 rounded-lg m-1"
          type="text"
          placeholder="DR Num"
          value={drNum}
          onChange={(e) => setDrNum(e.target.value)}
        /> */}
      </div>
      <div className="flex justify-center items-center">
        {
          status && (
            status ?
                <div className="text-green-500">Record(s) returned successfully</div>
            :
            <div className="text-red-500">Error</div>
          )   
        }
      </div>
      
      <div className="flex justify-center items-center">
        <table className="table-auto border text-sm m-1">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2 border">DR Num</th>
              <th className="p-2 border">Date Reported</th>
              <th className="p-2 border">Date Occurred</th>
              <th className="p-2 border">Time Occurred</th>
              <th className="p-2 border">Area Code</th>
              <th className="p-2 border">Area Name</th>
              <th className="p-2 border">Crime Code</th>
              <th className="p-2 border">Crime Description</th>
              <th className="p-2 border">Victim Age</th>
              <th className="p-2 border">Sex</th>
              <th className="p-2 border">Race</th>
              <th className="p-2 border">Weapon Code</th>
              <th className="p-2 border">Weapon Description</th>
              <th className="p-2 border">Latitude</th>
              <th className="p-2 border">Longitude</th>
            </tr>
          </thead>
          {recordData.map((record, index) => (
            <tbody key={index}>
              <tr className="bg-white">
                <td className="p-2 border">{record.dr_num}</td>
                <td className="p-2 border">{record.time.date_reported}</td>
                <td className="p-2 border">{record.time.date_occurred}</td>
                <td className="p-2 border">{record.time.time_occurred}</td>
                <td className="p-2 border">{record.area.area_code}</td>
                <td className="p-2 border">{record.area.area_name}</td>
                <td className="p-2 border">{record.crime.crime_code}</td>
                <td className="p-2 border">{record.crime.crime_desc}</td>
                <td className="p-2 border">{record.victim.age}</td>
                <td className="p-2 border">{record.victim.sex}</td>
                <td className="p-2 border">{record.victim.race}</td>
                <td className="p-2 border">{record.weapon.weapon_code || "N/A"}</td>
                <td className="p-2 border">{record.weapon.weapon_desc || "N/A"}</td>
                <td className="p-2 border">{record.coordinates.latitude}</td>
                <td className="p-2 border">{record.coordinates.longitude}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
