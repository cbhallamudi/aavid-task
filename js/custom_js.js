window.onload = function() {
  initDragElement();
};
// Draggable Divs
function initDragElement() {
  // if(element == ""){
  //   console.log("No Element");
  // }else{

  // console.log(element.parentElement.id);
  // console.log("Dragging");
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var popups = document.getElementsByClassName("popup");
  var elmnt = null;
  var currentZIndex = 100; 
  for (var i = 0; i < popups.length; i++) {
    var popup = popups[i];
    var header = getHeader(popup);

    popup.onmousedown = function() {
      this.style.zIndex = "" + ++currentZIndex;
    };

    if (header) {
      header.parentPopup = popup;
      header.onmousedown = dragMouseDown;
    }
  }

  function dragMouseDown(e) {
    

    elmnt = this.parentPopup;
    elmnt.style.zIndex = "" + ++currentZIndex;

    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    console.log("This is a header");
    if (!elmnt) {
      return;
    }

    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function getHeader(element) {
    var headerItems = element.getElementsByClassName("popup-header");

    if (headerItems.length == 1) {
      console.log(headerItems[0])
      return headerItems[0];
    }

    return null;
  }
  }
// }


// ================================================================
var _tabLength = 1;

function addNewTab(){
  
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabcontent[i].classList.remove("currentTab");
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById('tab').innerHTML += '<button class="tablinks" id="btnId'+_tabLength+'" onclick="openTab(this.id, \'tab'+_tabLength+'\')">Tab'+(_tabLength+1)+'</button>';
  document.getElementById('middle-section').innerHTML += '<div id="tab'+_tabLength+'" class="tabcontent"><button class="tab-content-close-btn" onclick="closeThisTab('+_tabLength+')"><strong class="tab-close">&times;</strong></button></div>';
  document.getElementById('tab'+_tabLength).style.display = "block";
  document.getElementById('tab'+_tabLength).className += " currentTab";
  document.getElementById('btnId'+_tabLength).className += " active";
  _tabLength++;
  console.log(_tabLength);
}

function openTab(btnId, tabId) {
  console.log(btnId+','+tabId);
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabcontent[i].classList.remove("currentTab");
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabId).style.display = "block";
  document.getElementById(tabId).className += " currentTab";
  document.getElementById(btnId).className += " active";
} 

function closeThisTab(btnTabId){
  document.getElementById('tab'+btnTabId).remove();
  document.getElementById('btnId'+btnTabId).remove();
  var i, tabcontent, tablinks;
  // _tabLength = document.getElementsByClassName('tabcontent').length;
  tabcontent = document.getElementsByClassName("tabcontent");
  if(tabcontent.length > 1){
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById("middle-section").lastChild.style.display = "block";
    document.getElementById("tab").lastChild.className += " active";
    // _tabLength++;
  }else{
    document.getElementById("tab0").style.display = "block";
    document.getElementById("btnId0").className += " active";
    // _tabLength++;   
  }

}


function closeWidget(widgetId){
    document.getElementById(widgetId).remove();
}

function addWidgetDropdown() {
  console.log("function triggered");
  document.getElementById("myDropdown").classList.toggle("show");
}

function addToCurrentTab(widgetClass) {

  // console.log(widgetClass.split("-")[0]);
  var widgetName = widgetClass.split("-")[0];
  if(widgetName == "quote"){
    var dummyContent = "A stock quote is the price of a stock as quoted on an exchange. A basic quote for a specific stock provides information, such as its bid and ask price, last traded price, and volume traded.";
  }else if(widgetName == "order"){
    var dummyContent = "An order is an instruction that an investor gives to buy or sell stocks on a trading platform or to a stock broker.";

  }else if(widgetName == "chart"){
    var dummyContent = "A graphical representation of price and volume movements of a stock over a certain period of time.";
    
  }else{
    var dummyContent = "A position is the amount of a security, asset, or property that is owned (or sold short) by some individual or other entity.";
    
  }
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    if(tabcontent[i].classList.contains("currentTab")){
      // console.log(tabcontent[i].getAttribute("id"));
      if(widgetName == "order"){
        tabcontent[i].innerHTML += '<div onmousedown="initDragElement()" class="popup '+widgetClass+'" id="'+tabcontent[i].getAttribute("id")+'-'+widgetClass+'"><div class="popup-header"><h4>'+widgetName+'</h4><button onclick="closeWidget(\''+tabcontent[i].getAttribute("id")+'-'+widgetClass+'\')" class="widget-close">×</button><button onclick="flipkart(\''+'flipCard-'+tabcontent[i].getAttribute("id")+'-'+widgetClass+'\')" class="flip-back" title="flip"><img src="./images/rotate.png" alt="Flip"></button></div> <div class="scene scene--card"><div class="card" id="'+'flipCard-'+tabcontent[i].getAttribute("id")+'-'+widgetClass+'">  <div class="card__face card__face--front"><div id="order-box"><div class="order-box-header"><span class="buy-statement">Buy RCBS &times; 1000 Qty on NSEIndia</span><label class="switch"><input type="checkbox" checked><span class="slider round"></span></label></div><div class="order-box-content"><div class="left-radio-btn-container"><label class="radio-container">MIS<input type="radio" checked="checked" name="left-group"><span class="checkmark"></span></label><label class="radio-container">NRML<input type="radio" name="left-group"><span class="checkmark"></span></label></div><div class="right-radio-btn-container"><label class="radio-container">MARKET<input type="radio" checked="checked" name="right-group"><span class="checkmark"></span></label><label class="radio-container">LIMIT<input type="radio" name="right-group"><span class="checkmark"></span></label></div><div class="clear-float"></div><div class="qptp"><form action=""><div class="inputs"><div class="formgroup"><label for="qty">Quantity</label><input type="number" name="qty" id="qty" placeholder="3000"></div><div class="formgroup"><label for="price">Price</label><input type="number" name="price" id="price" placeholder="1000"></div><div class="formgroup"><label for="tp">Trigger Price</label><input type="number" name="tp" id="tp" placeholder="1000"></div></div><div class="buy-btn"><input type="submit" value="BUY"></div></form></div>      </div></div>  </div>  <div class="card__face card__face--back"><div class="back-face-table"><table><caption>RCBS - Historical Trade Data</caption><thead><th>Date</th><th>Open</th><th>Close</th><th>High</th><th>Low</th><th>Volume</th></thead><tbody><tr><td>30-07-2021</td><td>&#8377; 3000</td><td>&#8377; 3000</td><td>&#8377; 2500</td><td>&#8377; 2000</td><td>3000</td></tr><tr><td>29-07-2021</td><td>&#8377; 3000</td><td>&#8377; 3000</td><td>&#8377; 2500</td><td>&#8377; 2000</td><td>3000</td></tr><tr><td>28-07-2021</td><td>&#8377; 3000</td><td>&#8377; 3000</td><td>&#8377; 2500</td><td>&#8377; 2000</td><td>3000</td></tr><tr><td>27-07-2021</td><td>&#8377; 3000</td><td>&#8377; 3000</td><td>&#8377; 2500</td><td>&#8377; 2000</td><td>3000</td></tr><tr><td>26-07-2021</td><td>&#8377; 3000</td><td>&#8377; 3000</td><td>&#8377; 2500</td><td>&#8377; 2000</td><td>3000</td></tr><tr><td>26-07-2021</td><td>&#8377; 3000</td><td>&#8377; 3000</td><td>&#8377; 2500</td><td>&#8377; 2000</td><td>3000</td></tr><tr><td>26-07-2021</td><td>&#8377; 3000</td><td>&#8377; 3000</td><td>&#8377; 2500</td><td>&#8377; 2000</td><td>3000</td></tr><tr><td>26-07-2021</td><td>&#8377; 3000</td><td>&#8377; 3000</td><td>&#8377; 2500</td><td>&#8377; 2000</td><td>3000</td></tr></tbody>      </table>    </div>  </div></div></div>';

      }else{

          tabcontent[i].innerHTML += '<div onmousedown="initDragElement()" class="popup '+widgetClass+'" id="'+tabcontent[i].getAttribute("id")+'-'+widgetClass+'"><div class="popup-header"><h4>'+widgetName+'</h4><button onclick="closeWidget(\''+tabcontent[i].getAttribute("id")+'-'+widgetClass+'\')">×</button></div><p>'+dummyContent+'</p></div>';
      }

    }
  }
  document.getElementById("myDropdown").classList.toggle("show");
}

function openProfileDiv() {
  document.getElementById("profile").style.display = "block";
}

function closeProfileDiv() {
  document.getElementById("profile").style.display = "none";
}

function flipkart(elementId){
  console.log(elementId);
  document.getElementById(elementId).classList.toggle("is-flipped");
}

// <h4>Quote</h4> <button onclick="closeWidget('main-tab-quote-widget')">×</button>