import { useState, useEffect } from "react";
import {HiTag} from 'react-icons/hi';
import {IoMdWallet} from 'react-icons/io';
import toast, {Toaster} from 'react-hot-toast'

const style = {
    button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
    buttonIcon: `text-xl`,
    buttonText: `ml-2 text-lg font-semibold`,
}

const Purchase = ({isListed, selectedNft, listings, marketPlaceModule}) => {
    
    const [selectedMarketNft, setSelectedMarketNft] = useState();
    const [enableButton, setEnableButton] = useState(false);
    
    // useEffect to track if the selected nft is listed or not
    useEffect(() => {
        if (!listings || isListed === 'false') return
        // function to run if the selected Nft is listed 
        ;(async () => {
            setSelectedMarketNft(
                listings.find((marketNft) => marketNft.asset?.id === selectedNft.id)
            )
        })()
    }, [selectedNft, listings, isListed]);
    
    // useEffect to enableButton based on selectedNft or selectedMarketNft
    useEffect(() => {
        if (!selectedMarketNft || !selectedNft) return

        setEnableButton(true)
    }, [selectedMarketNft, selectedNft])

    // toast to confirm purchase
    const confirmPurchase = (toastHandler = toast) => 
        toastHandler.success('Purchase Successful!', {
            style: {
                background: '#04111d',
                color: 'fff'
            },
        })

    // function to buy nft
    const buyItem = async (
        // default values for function argument
        listingId = selectedMarketNft.id,
        quantityDesired = 1,
        module = marketPlaceModule
    ) => {
        console.log(listingId, quantityDesired, module, 'david')
        // using thirdweb buyout method
        await module.buyoutDirectListing({
            listingId: listingId,
            quantityDesired: quantityDesired
        }).catch((err) => console.log(err))

        confirmPurchase()
    }


    return (
        <div className="bg-[#303339] h-20 w-full flex items-center px-12 rounded-lg border-[#151c22] border">

            <Toaster position="top-center" reverseOrder={false}/>
            
            {isListed === 'true' ? (
                <>
                    <div
                    onClick={() => {
                        enableButton ? buyItem(selectedMarketNft.id, 1) : null}}
                    className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>

                        <IoMdWallet className={style.buttonIcon}/>
                        <div className={style.buttonText}>Buy Now</div>
                    </div>

                    <div
                    className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
                    >
                        <HiTag className={style.buttonIcon} />
                        <div className={style.buttonText}>Make Offer</div>
                    </div>
                </>
            ) : (
                <>
                    <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
                        <IoMdWallet className={style.buttonIcon} />
                        <div className={style.buttonText}>List Item</div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Purchase;