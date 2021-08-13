import DBoardMenu from "../components/DBoardMenu"

const Dashboard =
{
    aRender: ()=>
    {

        

    },
    
    render: async ()=>
    {


        return`
        
        <div class="dashboard">
            ${ await DBoardMenu.render({selected:'dashboard'})}

            <div class="dashboard-content">
                <h1>Dashboard</h1>

                <div>
                    Info and Charts will be added here
                </div> 
            
            
            </div>
        </div>
        
        `
    }

}


export default Dashboard