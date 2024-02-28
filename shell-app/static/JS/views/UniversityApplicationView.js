import AbstractViews from "./AbstractViews.js";;

export default class extends AbstractViews{
    constructor(){
        super();
        this.setTitle("UnviersityApplication");
        this.setCSS("/static/CSS/UniversityApplication.css");
        this.setJS("/static/JS/university.js");
    }

    async getHtml(){
        return `
       
        
        
            <form class="form university-form">
        <header class="form__header">
            <h1>Ukukhula Bursary</h1>
            <h2>(University)</h2>
        </header>

        <section class="form__controls-container">
            <fieldset class="form__details-container">
            <legend class="form__details-header">University Details</legend>
            <ul class="form__controls">
                <li class="form__control">
                <label for="name">Name</label>
                <input type="text" name="universityName" id="name" required />
                </li>

                <li class="form__control">
                <label for="province">Province</label>
                <select name="provinceID" id="province">
                    <option value="0">Select Province</option>
                    <option value="1">Earstern Cape</option>
                    <option value="2">Freestate</option>
                    <option value="3">Gauteng</option>
                    <option value="4">Kwazulu-natal</option>
                    <option value="5">Limpopo</option>
                    <option value="6">Mpumalanga</option>
                    <option value="7">North West</option>
                    <option value="8">Northern Cape</option>
                    <option value="9">Western Cape</option>
                </select>
                </li>
            </ul>
            </fieldset>

            <fieldset class="form__details-container">
            <legend class="form__details-header">Contact Person</legend>
            <ul class="form__controls">
                <li class="form__control">
                <label for="first-name">First Name</label>
                <input type="text" name="firstName" id="first-name" required />
                </li>

                <li class="form__control">
                <label for="last-name">Last Name</label>
                <input type="text" name="lastName" id="last-name" required />
                </li>

                <li class="form__control">
                <label for="phone">Phone Number</label>
                <input type="tel" name="phoneNumber" id="phone" required />
                </li>

                <li class="form__control">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" required />
                </li>

                <li class="form__control">
                <label for="department">Department</label>
                <select name="departmentID" id="department">
                    <option value="0">Select Department</option>
                    <option value="1">Artificial Intelligence</option>
                    <option value="2">Computer Engineering</option>
                    <option value="3">Computer Game Design</option>
                    <option value="4">Computer Science</option>
                    <option value="5">Cybersecurity</option>
                    <option value="6">Data Science</option>
                    <option value="7">Information Systems</option>
                    <option value="8">Software Engineering</option>
                </select>
                </li>
            </ul>
            </fieldset>
        </section>
        <button
            type="submit"
            class="form__submit primary_button"
            id="add-university"
        >
            Add University
        </button>
        </form>
    `;
    }
}