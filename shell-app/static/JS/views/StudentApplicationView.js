import { StudentapplicationScript } from "../StudentApplication.js";
import AbstractViews from "./AbstractViews.js";

export default class extends AbstractViews{
    constructor(){
        super();
        this.setTitle("StudentApplication");
        this.setCSS("/static/CSS/StudentApplication.css");
    }

    async getHtml(){
        return `
        
        
        
        <script type="module" src="/static/JS/api/GetUniversities.js" ></script>
        <script type="module" src="/static/JS/StudentApplication.js" ></script>
        <form class="form application-form">
        <header class="form__header">
          <h2>Ukukhula Bursary</h2>
          <h3>(Student)</h3>
        </header>
  
        <section class="form__controls-container">
          <fieldset class="form__details-container">
            <legend class="form__details-header">Student Details</legend>
            <ul class="form__controls">
              <li class="form__control">
                <label for="first-name">First Name</label>
                <input type="text" id="first-name" name="firstName" required />
              </li>
              <li class="form__control">
                <label for="last-name">Last Name</label>
                <input type="text" id="last-name" name="lastName" required />
              </li>
              <li class="form__control">
                <label for="id-number">ID Number </label>
                <input type="text" id="id-number" name="idNumber" required />
              </li>
              <li class="form__control">
                <label for="birthdate">Birthdate </label>
                <input type="date" id="birthdate" name="birthdate" required />
              </li>
              <li class="form__control">
                <label for="gender">Gender</label>
                <select id="gender" name="genderId" required>
                  <option value="0">Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
                </select>
              </li>
              <li class="form__control">
                <label for="race">Ethnicity:</label>
                <select id="race" name="raceId" required>
                  <option value="0">Select Ethnicity</option>
                  <option value="1">Black</option>
                  <option value="2">Indian</option>
                  <option value="3">Colored</option>
                </select>
              </li>
            </ul>
          </fieldset>
          <fieldset class="form__details-container">
            <legend class="form__details-header">Contact details</legend>
            <ul class="form__controls">
              <li class="form__control">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phoneNumber" required />
              </li>
              <li class="form__control">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required />
              </li>
            </ul>
          </fieldset>
          <fieldset class="form__details-container">
            <legend class="form__details-header">Academic Details</legend>
            <ul class="form__controls">
              <li class="form__control">
                <label for="department">Department</label>
                <select id="department" name="departmentId">
                  <option value="0">Select Department</option>
                  <option value="1">
                    Artificial Intelligence
                  </option>
                  <option value="2">
                    Computer Engineering'
                  </option>
                  <option value="3">
                    Computer Game Design
                  </option>
                  <option value="4">Computer Science</option>
                  <option value="5">Cybersecurit</option>
                  <option value="6">'Data Science</option>
                  <option value="7">Information Systems</option>
                  <option value="8">
                    Software Engineering
                  </option>
                </select>
              </li>
              <li class="form__control">
                <label for="grade">Grade Average</label>
                <input type="text" id="grade" name="grade" required />
              </li>
              <li class="form__control">
                <label for="university">university</label>
                <select name="universityID" id="university">
                  <option value="0">Select University</option>
                </select>
              </li>
            </ul>
          </fieldset>
          <fieldset class="form__details-container">
            <legend class="form__details-header">Financial Details</legend>
            <ul class="form__controls">
              <li class="form__control">
                <label for="amount-needed">Amount Needed </label>
                <input
                  type="number"
                  id="amount-needed"
                  name="amount"
                  min="0"
                  step="0.01"
                  required
                />
              </li>
            </ul>
          </fieldset>
          <fieldset class="form__details-container">
            <ul class="form__controls">
              <li class="form__control">
                <label for="motivation">Motivational Statement:</label><br />
                <textarea
                  id="motivation"
                  name="motivation"
                  rows="5"
                  required
                ></textarea>
              </li>
            </ul>
          </fieldset>
        </section>
  
        <button type="submit" class="form__submit">Submit</button>
      </form>
    
    `;
    }
    async getJS(){
      StudentapplicationScript();
    }
}