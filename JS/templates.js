
export const Graph = `
<div id="container">
<!-- Debust SVG -->

        <svg version="1.1"
           xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
           x="0px" y="0px" width="800px" height="400px" viewBox="0 0 750 450" enable-background="new 0 0 741 500"
           xml:space="preserve">


           <text id="dynamicText" x="50" y="30" style="visibility: hidden;fill: #FFFFFF;">Texte dynamique</text>
        <path id="graph-measurement" fill="none" stroke="#741E00" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
          M731,127H10 M10,127v-18 M113,127v-9.1 M731,109v18 M216,127v-9.1 M319,127v-9.1 M422,127v-9.1 M525,127v-9.1 M628,127v-9.1"/>
<!-- Fin SVG  -->
        
          </svg>

      </div>

`
export const IndexHTML = `
<div class="login-box" id="main">
<h2>Login</h2>
<form id="form">
  <div class="user-box">
    <input type="text" id="username" name="" required="" autocomplete="off">
    <label>Username</label>
  </div>
  <div class="user-box">
    <input type="password" id="password" name="" required="">
    <label>Password</label>
  </div>
  <button type="submit">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  Submit
</button>
</form>
</div>
`
const header = `
<header>

<h1>GraphQL</h1>

<form id="formlogout">
 
  <button type="submit">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  Logout
</button>

</form>
</header>
`

const userInfos = `
<div class="flexbox" id="User">
</div>


<div class="flexbox" >



<div class="flexbox flex" id="infosuser" >
</div>



<div class="flexbox">

<h2>Skills :<h2/>
<div class="legend" id="legendgraph">
</div>

</div>
`

const circle = `

<div class="flexbox" >

<div class="flexbox">
<h3>Legend: Graph Circle Ratio (up/down)</h3>
<div class="legend" id="legendcircle">

</div>

</div>

<div class="flexbox">

<div class="flex-wrapper">
<div class="single-chart">
<svg viewBox="0 0 36 36" class="circular-chart blue">
  <path class="circle-bg"
    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
  />
  <path class="circle" id="pathcircle"
    stroke-dasharray="0, 100"
    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
  />
  <text x="18" y="20.35" class="percentage">0%</text>

</svg>
</div>
</div>
</div>

</div>
`

const graph = `

<div class="flexbox">
<div class="flexbox">
<h3>Legend: Graph % Skills</h3>

</div>
<div class="flexbox">
${Graph}
</div>
</div>
`


export const HomeHTML = `
<main>

<!-- Debut header -->
${header}
<!-- Fin header -->
<!-- Debut infos -->
${userInfos}
<!-- Fin infos -->
<!-- Debut graph -->
${graph}
<!-- Fin graph -->
<!-- Debut graph circle -->
${circle}
<!-- Fin graph circle -->


    </main>
`

