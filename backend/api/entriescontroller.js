//Class to control directAccessObject requests to the mongodb Database through entriesDAO; meant for queries and parses
//Consider renaming to entriesInteraction or entriesQuery or entriesParser or entriesSearcher or something else of the sort.
//Imports
import entriesDAO from '../dao/entriesDAO.js';

export default class entriesController{
    //We should parse our search-term "text" input in the front-end to determine if there are any specific criterion to look out for, or if we are executing a general search of literally all criteria for the database, then add a corresponding string as the query.
    //Gets results from a search request (req) containing a set of filters (search-terms for the mongoDB to parse through), page number, and given entries per page. Sends out response (res) containing matching entries, a page number, the set of filters, and a given number of search results. 
    //  Consider removing page number and filters from response. This comes across quite pointless and adds unneeded clutter.
    //  May want to rename to "apiGetSrchResults" and have a separate results method for the frontpage displays?
    //  Search method taking a req as an input, which represents the contents of a search URL. query.X is the field contained within the url.
    //We can reduce total number of requests to the mongoDB server by requesting all results at once to the client, and then parsing them out as according to page number on the client end.
    static async apiGetResults(req, res, next){
        //Define the three fields - filters, page, entriesPerPage, which will be passed to the search handler in entriesDAO
        //The input request will contain a query with an amount of search results to display per page. Default given as 20.
        //Might want to consider renaming to "resultsPerPage"? if this is a search function only.
        const entriesPerPage = req.query.entriesPerPage ? parseInt(req.query.entriesPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 1; //Page-number tracking.

        //Filters hopefully passed in through the url. If no filters were given, you should not allow the search; this should be handled in the frontend by simply not sending back a search query if the filters set is empty.
        //The getResults function is going to send a json file called 'filters' to the search query which will contain all of the search specifics that will then be sent to the database and checked for.
        let filters = {};
        //Was there a title field given in the search query? If so, then our
        if(req.query.title){
            filters.title = req.query.title;
        }
        if(req.query.src){
            filters.src = req.query.src;
        }
        /* Additional search query contents to add later.
            if(req.query.context){
                filters.context = req.query.context;
            }
            if(req.query.hid){
                filters.hid = req.query.hid
            }*/
        
        //Send a search query to the mongoDB database to get values for: the total list of results AND 
        //MAKE SURE THAT THERE ARE NO ERRORS IN entries.DAO, because CALLS TO METHODS FROM IT IN entriescontroller.js WILL NOT SEE THOSE ERRORS, AND WILL INSTEAD SIMPLY NOT RETURN A VALUE AND THEREBY CRASH AND PREVENT A RESOLUTION OF THE PROMISE, THUS BLOCKING A CONNECTION TO THE LOCALHOST SIT
        //Given code in tutorial: const { resultsList, totalNumResults } = await entriesDAO.getResults({...}) was not being recognized as an asynchronuous function and was therefore complaining that there were no fields in the result.
        const contents = await entriesDAO.getResults({
            filters,
            page,
            entriesPerPage,
        }) //|| [1, 1];
        //Give a response containing what was found
        let response = {
            results: contents[0],
            totalNumResults: contents[1],
            page: page,
            filters: filters,
            entriesPerPage: contents[1],
        }
        //Send a json file containing our given response fields as the response from the method.
        res.json(response);
        }
        

        static async getContents(req, res){
            return await entriesController.getResults
        }
}