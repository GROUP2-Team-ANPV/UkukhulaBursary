import AbstractViews from "./AbstractViews.js";
const head = document.querySelector("head");
const script = document.createElement("script");
const cssLink = document.createElement("link");
script.setAttribute("src", "/static/JS/university_data.js");
cssLink.setAttribute("rel", "stylesheet");
cssLink.setAttribute("href", "/static/CSS/AdminDashboard.css");

head.appendChild(script);
head.appendChild(cssLink);

export default class extends AbstractViews {
  constructor() {
    super();
    this.setTitle("Login");
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
      <script src="/university_data.js" type="module" ></script>
       
    `;
  }
}
