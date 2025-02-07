inline styles
use js dom, refresh faster because only update the changed part (duplicate same map, have original map, see which one differs, update changed part)
components = <Card/> A React component is a reusable, self-contained piece of a web interface that defines how a part of the UI looks and behaves.
props (passed in the function)

states -> react components brain, holds info about component that can change over time

wont update
react rendering process relies on state and props to decide how to rerender the component

create state inside of the const another const

use typically referred as a hook, more simply and scallably

useState has to destructure the actual variable name 

const [hasLiked, setHasLiked] = useState(initialState: false)

setHasLiked is to update

callback function -> one this button this clidked, the function will be executed, but specifically, whatever after the arrow braces will be executed

conditional logic can change a thing

{hasLiked?'Liked':'Like'}
if hasLiked true, 
liked
if false Like

if state re rendered, go back to initial value
if the state changes, react auto rerendered component on the screen


if we only change that state, one card, only change that one, doesnt update any other cards

hooks are special function in react that allows that into special react features like state management

useState = managing state
useEffect = handling side effects like data fetching 
-> special tool in react like fetching data from server and cleanup component from screen, 
for example = we want to log a message everytime liked a movie
useContext = for sharing data across components
useCallback = for optimizing callback functions

plenty more

myeffect runs twice when the component mount, strict mode on, un development, react runs setup and cleaup one extra before actual. like a stress test

const [count, setCount] = useState(0)
gblh 
<div className="card" onClick={()=>setCount(count+1)}>
<div className="card" onClick={()=>setCount((prevState)=>prevState+1)}>

run useeffect only when something changes, dependencies array, pass as an param, react try to recalc to see if its has changed, if its  has changed, useeffect will be called

empty dependency array run only once

conditional rendering show different ui depends on the criteria

props like input to pass into a component

in search.jsx we dont have to always do props.searchTerm, we can destructure it because its an object

props cant be edit by the child component, its read only, breaks main behavior and mutate react to multiple spaces
never mutate state and props
for example searchTerm = 'NEW SEARCH TERM'
we only mutate state using setter function

jd set awal search with props itu prtm di Apps, trs kt build dll the search and onclick dll di Search but use the props, then back to the app to display it using the props)

api is a application programmiong interface
set of rule to allow one software to talk to another

belajar the api and error message and stuff


fetch is a built in to make HTTP req like get or post. to get data from apis to display in web
    try{
        const endpoint = `$API_BASE_URL/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint, API_OPTIONS)



if want to fetch api, make endpoint, make response, make api stuff like this

"const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS ={
  method: 'GET',
  headers:{
    accept: 'application/json', //api will send back a json object
    Authorization :`Bearer ${API_KEY}`
  }
}
"

then we can make fetch const (try and catch and finally)

then we use useeffect to call the const

cara isloading itu, prtm,           {isLoading ? (
            <p className="text-white">Loading...</p>
          ) :errorMessage? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (

            isloading, trs kt check ada errormessage ga, trs lanjut display