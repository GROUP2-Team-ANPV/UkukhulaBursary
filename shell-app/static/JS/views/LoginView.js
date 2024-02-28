import { LoginScript } from "../Login.js";
import AbstractViews from "./AbstractViews.js";

export default class extends AbstractViews{
    constructor(){
        super();
        this.setTitle("Login");
        this.setCSS("/static/CSS/Login.css");
        
    }

    async getHtml(){
        return `
      
      
        <article class="wrapper">
        <form id="loginForm">
          <img src="https://bbdsoftware.com/wp-content/uploads/logo.svg" alt="logo">
          <article class="input-box">
            <input type="text" id="username" placeholder="Username" required>
            <i class='bx bxs-user'></i>
          </article>
          <article class="input-box">
            <input type="password" id="password" placeholder="Password" required>
            <i class='bx bxs-lock-alt' ></i>
          </article>
          <article class="remember-me">
            <label><input type="checkbox">Remember Me</label>
          </article>
          <button type="submit" class="btn">Login</button>
        </form>
      </article>
      
            
       
    `;
    }

    async getJS(){
      LoginScript();
    }
}