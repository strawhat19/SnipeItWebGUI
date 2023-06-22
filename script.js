let rows = [];
let columnLabels = [];
let getDoc = (selector) => document.querySelector(selector);
let headerRow = getDoc(`.headerRow`);
let middleRows = getDoc(`.middleRows`);
let footerRow = getDoc(`.footerRow`);
let snipeITacceccoriesAPIUrl = `https://develop.snipeitapp.com/api/v1/accessories?limit=50&offset=0&order_number=null&sort=created_at&order=desc&expand=false`;

let setColumnLabels = (labels, rowsToAffect) => {
  rowsToAffect.forEach(labelRow => {
    labelRow.innerHTML = ``;
    labels.forEach((colLabel, colIndex) => {
      let colDiv = document.createElement(`div`);
      colDiv.classList.add(`headerColumn`);
      colDiv.classList.add(`column`);
      colDiv.innerHTML = colLabel;
      labelRow.append(colDiv);
    });
  })
}

let getAccessories = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTU2MDc0MjVmYjM5YTEwYjFjNTZlZTAxMTBmZDk4ZjQ0ZjVjODMzYjcxZWVhYjZlNDk1NGMwOThlY2YzMzU2MDY4Mzg4MmFhMDMzOTAzNzciLCJpYXQiOjE2MzI4NjU5MTgsIm5iZiI6MTYzMjg2NTkxOCwiZXhwIjoyMjY0MDIxNTE4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.LgGVzyH67IRhXvccHd4j2Dn6TDuIuQTBoo30_wD9jPehy8v_h0xBmE1-dOUBRJyeJOI8B4gwPeALsWaudpGj9Lb5qWAtKV7eYtH9IYQKoLF_iHgOGXnAUcNwID6zBU_YyLNSI6gp8zjutLJias33CBLsHy5ZRNpxVibVrZouJ_HjYuIYbtZyLus-KFFeibtZoPiTWOeHhQFD37MR6ifx4dBqT37fN-xDS99mONtrkAplEIou5aSO1oZ4IlJIPCUyA1lixPgpn1YU7PxiBDZp1teeugD0WEmrAqxRS2I0bH4qPsuTsrVXS_lo87Sf5LBGLW7lGHKqyYH6J47OZOM0K-SrxLKtE1ww8jyLBgnnxH0lJHRLCBiwUnL5ZGTUmiOysUA-wSJ6s78o8Pc-ec6bpBvAlelHdiQ-wslE7gzEJDptbejFg-75b_CEwgJYh7J2D18ul6Qu5EFCUEgt033mm04dgVk0isWTDt6EW5ZvTo5Qhr1LY0YnEIXCTqIRN-BSQjL55sZaCrtwR_21bnBGgniyI5MRDYblFawVmFKroeClCpSjBo9vi66akdD5hjpvx67RL3r33BZQhEXmPifUPNH5wP_U-IHGFUD99TJk2c1awF0RASveZRLSunbJb1x6hGAVUaIvQV4r2quWzXqYyKLph9kGTyJYrb6iJtH5smE'
        }
      };

      fetch(snipeITacceccoriesAPIUrl, options).then(response => {
          if (response.status == 200) return response.json();
        }).then(data => {
          if (data.rows && data.rows.length > 0) {
            data.rows.forEach((acc, accIndex) => {
              let { id, name, image, category, company, location, manufacturer, min_qty, qty, remaining_qty, supplier, user_can_checkout } = acc;

              let customAccessoryDataForOurAPI = {
                id, 
                name, 
                image, 
                company, 
                quantity: qty, 
                minimum: min_qty, 
                category: category.name, 
                location: location.name, 
                supplier: supplier.name,
                remaining: remaining_qty,
                checkout: user_can_checkout,
                manufacturer: manufacturer.name, 
              };

              columnLabels = Object.keys(customAccessoryDataForOurAPI);
              rows.push(customAccessoryDataForOurAPI);
            });

            middleRows.innerHTML = ``;
            rows.sort((a,b) => a.id - b.id).forEach(row => {
              let rowDiv = document.createElement(`div`);
              rowDiv.classList.add(`middleRow`);
              rowDiv.classList.add(`row`);
              let values = Object.values(row);
              setColumnLabels(values, [rowDiv]);
              middleRows.append(rowDiv);
            })
            setColumnLabels(columnLabels, [headerRow, footerRow]);
          }
          return data;
        })
        .catch(err => console.error(err));
    } catch (error) {
        console.log(error);
    }
}

getAccessories();