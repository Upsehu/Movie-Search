// oninput='debounce(main, 1000)'

import {navbar} from '../components/navbar.js'
console.log(navbar());

document.querySelector('nav').innerHTML = navbar();

let timeId;

let input_box = document.getElementById('query')
input_box.addEventListener('input', function(){
    // search_box.style.display = 'block';
    debounce(main, 1000)
});



    let search_box = document.getElementById('search-box');

    document.querySelector('body').addEventListener('click', function(){
        search_box.style.display = 'none';
    })


    //Show Box to show movies data
    let show = document.getElementById('show');

    //Error Box to show Error Image
    let error = document.getElementById('error');

    //Search Function
    async function search(movie){

        let query = document.getElementById('query').value;

        try{

            let res = await fetch(`https://www.omdbapi.com/?apikey=9f16de42&s=${query}`)

            // console.log("res",res);

            let data = await res.json();

            // console.log('dat',data);

            return data;
            
        }
        catch(e){
            showError();
        }
    }

    function appendMovies(data){
        

        search_box.style.display = 'block';
        search_box.innerHTML = null;

        show.innerHTML = null;

        console.log(data.Response);
        if(data.Response === 'False'){
            console.log('error');
            showError();
            return;
        }

        // console.log(data);
        let movies = data.Search;

        console.log(movies);

        movies.forEach((movie) => {

            error.innerHTML = null;

            // console.log(Poster, Title, Year);
            if(movie.Poster !== 'N/A'){
                let div = document.createElement('div');

                div.addEventListener('click', function(){
                    localStorage.setItem('movie',  JSON.stringify(movie))
                    window.location.href = '/html/movie-discription.html'
                })

                div.style.height = '600px';
                div.style.padding = '20px';
                div.style.justifyContent = 'center';
                div.style.borderRadius = '20px'

                let imgBox = document.createElement('div');
                
                // imgBox.style.width = '100%';
                imgBox.style.height = '80%';
                imgBox.style.overflow = 'hidden';
                imgBox.style.justifyContent = 'center';
                imgBox.style.borderRadius = '20px';
                // imgBox.style.border = '1px solid white';
                imgBox.style.margin = 'auto';
                let img = document.createElement('img');
                img.src = movie.Poster;
                img.style.height = '100%';
                img.style.width = '100%';
                imgBox.append(img);

                let text = document.createElement('div');
                text.style.paddingLeft = '20px';
                let h2 = document.createElement('h2');
                h2.innerText = movie.Title;

                let h3 = document.createElement('h3');
                h3.innerText = movie.Year;
                
                text.append(h2,h3);

                div.append(imgBox, text);
                div.style.justifyContent ='center'; 

                show.append(div);

                // Add movie name to search-box
                let p = document.createElement('p');
                p.innerText = movie.Title;

                search_box.append(p);


            }
        });



    }


    function showError(){


        error.innerHTML = null;

        let div = document.createElement('div');
        div.style.border = '1px solid white';
        div.style.width = '20%';
        div.style.margin = 'auto';

        let img = document.createElement('img');
        img.style.width = '100%';
        img.src = 'https://c.tenor.com/PqB4w3BhK_MAAAAS/no-names.gif';

        div.append(img);

        // let body = document.querySelector('body')

        error.append(div);
        
    }


    async function main(){

        let data = await search();

        console.log(data);

        appendMovies(data);
    }


    function debounce(func, delay){

        if(timeId){
            clearTimeout(timeId);
        }

        timeId = setTimeout(function(){
            func()
        }, delay);
    }