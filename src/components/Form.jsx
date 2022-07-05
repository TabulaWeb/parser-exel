import { React, useState } from "react";
import * as XLSX from "xlsx";

import "./Form.css";

const Form = () => {
  // input type text

  const [date, setDate] = useState([]);

  const [raw, setRaw] = useState([]);

  const [inputList, setInputList] = useState([
    {
      type: "text",
      id: 1,
      value: "",
    },
  ]);

  const addInput = () => {
    setInputList((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const removeInput = (id) => {
    let newList = [...inputList];
    newList.splice(id, 1);
    setInputList(newList);
  };

  const handgleChange = (e) => {
    e.preventDefault();
    const index = e.target.id;
    setInputList((s) => {
      const newList = s.slice();
      newList[index].value = e.target.value;
      return newList;
    });
  };

  const onChange = (e) => {
    const finalObject = {};
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      // console.log(workbook.Sheets[sheetName])

      const worksheet2 = workbook.Sheets[sheetName];
      const jason = XLSX.utils.sheet_to_csv(worksheet2);
      console.log(workbook);
      console.log(jason);

      const example = jason;

      let val = example.match(/[0-9][0-9].[0-9][0-9].202[0-9]/gm);
      let arr = [];
      console.log(`do mapa ${date}`);
      val.map((elem) => {
        arr.push(elem);
        setDate(date.push(elem));
      });
      console.log(date);

      setDate(
        date.map((elem) => {
          return elem;
        })
      );

      setRaw(
        date.map((keyDate) => {
          return { [keyDate]: `${""}` };
        })
      );

      for (let i = 0; i < arr.length - 1; i++) {
        let regex = new RegExp(arr[i] + "[\\s\\S]*?" + arr[i + 1], "gm");
        console.log(arr[i], arr[i + 1]);
        console.log(example.match(regex));
      }

      const json = XLSX.utils.sheet_to_json(worksheet);
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };

  // --- end input file logic

  const handleExport = () => {
    let wb = XLSX.utils.book_new();
    console.log(raw);
    console.log(date);
    // let ws = XLSX.utils.json_to_sheet([{ data: '' }, ...raw])
    // let ws = XLSX.utils.json_to_sheet(raw, { header: date })
    // for (let i = 1; i < inputList.length; i++) {
    //     XLSX.utils.sheet_add_json(ws, [
    //         { A : 5, B: 6, C: 444 }
    //     ], {origin: `A${i}`})
    // }

    let header = [date];
    let ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, header);

    for (let i = 0; i < inputList.length; i++) {
      for (let j = 0; j < date.length; j++) {
        raw[j] = { [date[j]]: inputList[i].value };
      }
      XLSX.utils.sheet_add_json(ws, raw, {
        origin: `A${i + 2}`,
        skipHeader: true,
      });
    }
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "MyExel.xlsx");
  };
  //

  // [{[adafersf]:''},{[sefsefs]:''}]

  return (
    <div className="content">
      <h2>form</h2>
      {inputList.map((item, i) => {
        return (
          <div>
            <input
              onChange={handgleChange}
              value={item.value}
              id={i}
              type={item.type}
              size="40"
            />
            <button
              className="removeButton"
              onClick={() => removeInput(i)}
            ></button>
          </div>
        );
      })}
      <button className="addButton" onClick={addInput}></button>
      <input onChange={onChange} type="file" />
      <button onClick={handleExport}>создать форму</button>
    </div>
  );
};

export default Form;
