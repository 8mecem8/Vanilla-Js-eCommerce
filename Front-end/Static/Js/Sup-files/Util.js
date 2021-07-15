<<<<<<< HEAD
import axios from 'axios'


export const parseRequestUrl = () =>
{   
    const url =  document.location.hash.toLowerCase();
    const request = url.split("/");

    //console.log('request is =>>>',request)

     return{
=======
export const parseRequestUrl = () =>
{   
    const url = document.location.hash.toLowerCase();
    const request = url.split("/");

    console.log(request)
    return{
>>>>>>> 516093ab7d234b338de922cdf9aeccfba7d317a6
        resource: request[1],
        id: request[2],
        verb: request[3],
    }

    
<<<<<<< HEAD
};

export const rerender = async(component) =>
{
  document.location.hash = '/cart'  //document.getElementsByClassName("main-container").innerHTML = await component.render(); await component.aRender()
}



export const signina = async(credentials) =>
{
    const response = await axios.post('http://localhost:5000/api/users/signin', credentials)
    
    return response.data

}


export const setUserInfo = async(data) =>
{

 

     window.localStorage.setItem(
        'loggedappUser', JSON.stringify(data)
      ) 

}



export const getUserInfo = async() =>
{
    return window.localStorage.getItem('loggedappUser') ? 
      JSON.parse(window.localStorage.getItem('loggedappUser')) :
      {name:'',email:'',password:''}

}

/* ------------loading screen----------------- */

export const showLoading = () =>
{
 document.getElementById('loading-overlay').classList.add('active')
}


export const hideLoading = () =>
{
 document.getElementById('loading-overlay').classList.remove('active')
}

/* ------------loading screen end----------------- */



export const showMessage = (message, callback) => {
  document.getElementById('message-overlay').innerHTML = `
  <div>
    <div id="message-overlay-content">${message}</div>
    <button id="message-overlay-close-button">OK</button>
  </div>
  `;
  document.getElementById('message-overlay').classList.add('active');
  document
    .getElementById('message-overlay-close-button')
    .addEventListener('click', () => {
      document.getElementById('message-overlay').classList.remove('active');
      if (callback) {
        callback();
      }
    });
};
=======
}
>>>>>>> 516093ab7d234b338de922cdf9aeccfba7d317a6
