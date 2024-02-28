import AbstractViews from "./AbstractViews.js";
import { getUniversityData } from "../api/GetUniversityData.js";


export default class extends AbstractViews {
  constructor() {
    super();
    this.setTitle("University DashBoard");
    this.setCSS("/static/CSS/AdminDashboard.css")
  
  }
  
  async getHtml() {
    return `
      <main class="innercontent">
        <section class="content__primary">
          <section class="content__students">
            <header class="content__header">
              <h2>Students</h2>
              <i class="bx bx-dots-horizontal-rounded bx-md"></i>
            </header>
            <ul class="students">
              <!-- fetch students from the database -->
            </ul>
          </section>
        </section>
  
        <aside class="content__secondary">
          <section class="content__funds">
            <header class="content__header">
              <h2>Funds</h2>
            </header>
            <section class="funds">
              <section>
                <p>Balance</p>
                <p class="funds__balance">R756 000.00</p>
              </section>
  
              <section class="funds_usage">
                <section class="funds__used">
                  <p>Total Used</p>
                  <p class="used">R44 000.00</p>
                </section>
                <section class="funds__used">
                  <p>Students</p>
                  <p class="funded">3</p>
                </section>
              </section>
            </section>
          </section>
          <section class="content__hods">
            <header class="content__header">
              <h2>HODs</h2>
              <i class="bx bx-dots-horizontal-rounded bx-md"></i>
            </header>
            <ul class="hods">
              <li class="hod">
                <h3 class="student__name">Ndzalama Mabasa</h3>
                <p class="department">Department</p>
                <p class="email">
                  <a href="mailto:ndzalama.mabasa@univen.ac.za"
                    >ndzalama.mabasa@univen.ac.za</a
                  >
                </p>
              </li>
  
              <li class="hod">
                <h3 class="student__name">Ndzalama Mabasa</h3>
                <p class="department">Department</p>
                <p class="email">
                  <a href="mailto:ndzalama.mabasa@univen.ac.za"
                    >ndzalama.mabasa@univen.ac.za</a
                  >
                </p>
              </li>
  
              <li class="hod">
                <h3 class="student__name">Ndzalama Mabasa</h3>
                <p class="department">Department</p>
                <p class="email">
                  <a href="mailto:ndzalama.mabasa@univen.ac.za"
                    >ndzalama.mabasa@univen.ac.za</a
                  >
                </p>
              </li>
  
              <li class="hod">
                <h3 class="student__name">Ndzalama Mabasa</h3>
                <p class="department">Department</p>
                <p class="email">
                  <a href="mailto:ndzalama.mabasa@univen.ac.za"
                    >ndzalama.mabasa@univen.ac.za</a
                  >
                </p>
              </li>
  
              <li class="hod">
                <h3 class="student__name">Ndzalama Mabasa</h3>
                <p class="department">Department</p>
                <p class="email">
                  <a href="mailto:ndzalama.mabasa@univen.ac.za"
                    >ndzalama.mabasa@univen.ac.za</a
                  >
                </p>
              </li>
            </ul>
          </section>
        </aside>
      </main>
       
    `;
  }
 async getJS(){
     getUniversityData(1)
     const storedData = JSON.parse(sessionStorage.getItem("universityData"));
     const universityStudents = document.querySelector(".students");
     const fundedStudents = document.querySelector(".funded");

        if(storedData){
          fundedStudents.textContent = getFundedStudents(storedData.students);
          renderStudents(storedData.students)
        }
        
        function getFundedStudents(students) {
          return students.filter((student) => student.applicationStatus === "Approved")
            .length;
        }

        function renderStudents(students) {
          students.forEach((student) => {
            const studentItem = document.createElement("li");
            studentItem.classList.add("student");
            const studentName = document.createElement("h3");
            studentName.classList.add("student__name");
            const applicationStatus = document.createElement("p");
            applicationStatus.classList.add(
              "student__status",
              student.applicationStatus.toLowerCase()
            );

            const bursaryAmount = document.createElement("p");
            bursaryAmount.classList.add("student__amount");

            studentName.textContent = `${student.firstName} ${student.lastName}`;
            applicationStatus.textContent = student.applicationStatus;
            bursaryAmount.textContent = `R${student.amount}`;
            studentItem.appendChild(studentName);
            studentItem.appendChild(applicationStatus);
            studentItem.appendChild(bursaryAmount);
            universityStudents.appendChild(studentItem);
          });
        }

          }
}
