let bagItemObj;
    onLoad()
    function onLoad(){
        displaybagObject();
        displayBagItems();
        bagSummary();
    }


    function removeFromBag(itemId){
        bagItem = bagItem.filter(bagItem => bagItem != itemId)
        localStorage.setItem("bagItem", JSON.stringify(bagItem));
        displaybagObject();
        displayBagItems(); 
        displayBegCount();
        bagSummary();
    }    


    function displaybagObject(){
        console.log(bagItem)
        bagItemObj = bagItem.map(itemId=>{
            for(let i = 0; i < items.length; i++){
                if(itemId == items[i].id){
                    return items[i]
                }
            }
        })
        console.log(bagItemObj)
    }



    function displayBagItems(){
        let bagItemsContainer = document.querySelector('.bag-items-container')

        let innerHTML = ''  
        console.log(bagItemObj)
        bagItemObj.forEach(item => {
            innerHTML +=  `
        
        <div class="bag-item-container">
                <div class="item-left-part">
                <img class="bag-item-img" src="../${item.image}">
                </div>
                <div class="item-right-part">
                <div class="company">${item.company}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price-container">
                    <span class="current-price">Rs ${item.current_price}</span>
                    <span class="original-price">Rs ${item.original_price}</span>
                    <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
                </div>
                <div class="return-period">
                    <span class="return-period-days">${item.return_period} days</span> return available
                </div>
                <div class="delivery-details">
                    Delivery by
                    <span class="delivery-details-days">${item.delivery_date}</span>
                </div>
                </div>

                <div class="remove-from-cart" onclick='removeFromBag(${item.id})'>X</div>
            </div>
        
        
        `
        });

        bagItemsContainer.innerHTML = innerHTML;

    }




    function bagSummary(){
        let totalPrice =  document.querySelector('.bag-summary')
        let totalMRP = 0
        let numOfItems = bagItem.length 
        let discount = 0

        bagItemObj.forEach(item2=>{
            totalMRP += item2.original_price
            discount += item2.original_price - item2.current_price;
           
        })
     const convenience = totalMRP != 0 ? 99 : 0
     let grandTotal = totalMRP - discount + convenience


        totalPrice.innerHTML = `
        <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${numOfItems} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs ${discount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs ${convenience}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${grandTotal}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
        `

    }