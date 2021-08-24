import React, { useMemo } from 'react';  
import queryString from 'query-string';

import { useForm } from '../../hooks/userForm';
import { HeroCard } from '../heroes/HeroCard';
import { useLocation } from 'react-router-dom';
import { getHeroByName } from '../../selectors/getHeroByName';

export const SearchScreen = ({history}) => {



    const location = useLocation();
    const {q =''} = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText:q
    });

    const {searchText} =formValues;

    const heroesFiltered = useMemo(() => getHeroByName(searchText), [q]);

    const handleSearch = (e) => {
        e.preventDefault();

        history.push(`?q=${searchText}`);
        
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            name="searchText"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            value={searchText}
                            onChange={handleInputChange}
                        >
                        </input>
                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-online-primary"
                        >
                            Search
                        </button>  
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />


                    {   
                        (q ==='')
                        &&
                        (<div className="alert alert-info">
                            Search a hero
                        </div>)
                    }


{   
                        (q !=='' && heroesFiltered.length === 0)
                        &&
                        (<div className="alert alert-danger">
                            There is not a hero with {q}
                        </div>)
                    }
                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
