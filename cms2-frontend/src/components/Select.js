import React from 'react'

function Select({onSelectChange}) {
    const handleSelectChange = (event) => {
        const selectedOptions = event.target.selectedOptions;
        const selectedValues = Array.from(selectedOptions).map((option) => option.value);
        onSelectChange(selectedValues);
      };
    
  return (
    <div>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tailwind Multiselect with tom-select</title>
    <link href="https://cdn.jsdelivr.net/npm/tom-select/dist/css/tom-select.css" rel="stylesheet" />
    <div style={{background: "#f0f0f0"}}>
      <label className="inline-block text-sm text-gray-600" htmlFor="Multiselect">Select categories</label>
      <div className="relative flex w-full">
        <select onChange={handleSelectChange} style={{background: 'rgb(240, 240, 240)',textAlign: 'center'}} id="select-role" name="roles[]" multiple placeholder="Select roles..." autoComplete="off" className="block w-full rounded-sm cursor-pointer focus:outline-none">
          <option value={"Travel"}>Travel</option>
          <option value={"Work"}>Work</option>
          <option value={"Coding"}>Coding</option>
          <option value={"Lifestyle"}>Lifestyle</option>
          <option value={"Gardening"}>Gardening</option>
          <option value={"Sungazing"}>Sungazing</option>
        </select>
      </div>
    </div>
  </div>
  )
}

export default Select