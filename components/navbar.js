function navbar(){

    return `<h3><a href="/index.html">Home</a></h3>
    <div id="input">
        <input  type="text" placeholder="Search Movie Name" id='query'>
        <!-- <button onclick='search()'>Search</button> -->
        <div id='search-box'>

        </div>
    </div>

    <div id='choices'>
        <h3><a href="/html/signin.html">Signin</a></h3>
        <h3><a href="/html/signup.html">SignUp</a></h3>
    </div>
`
}

export {navbar};