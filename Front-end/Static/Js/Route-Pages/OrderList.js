import DBoardMenu from "../components/DBoardMenu"


const OrderList =
{
    aRender: ()=>
    {

        

    },
    
    render: async ()=>
    {


        return`
        
       <div class="dashboard">
            ${ await DBoardMenu.render({selected:'orders'})}

            <div class="dashboard-content">
                <h1>Order List</h1>

                <div>
                    Products will be added here
                </div> 
            
            
            </div>
        </div>

        `
    }

}


export default OrderList