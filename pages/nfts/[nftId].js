import React, {useState, useEffect, useMemo} from 'react';
import {useRouter} from 'next/router';
import { useWeb3 } from '@3rdweb/hooks';
import {ThirdwebSDK} from '@3rdweb/sdk';
import Header from '../../components/Header';
import NFTImage from '../../components/nft/NFTImage';
import GeneralDetails from '../../components/nft/GeneralDetails';
import ItemActivity from '../../components/nft/ItemActivity';

const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container p-6`,
    topContent: `flex`,
    nftImgContainer: `flex-1 mr-4`,
    detailsContainer: `flex-[2] ml-4`,
    }

const Nft = () => {
    const {provider} = useWeb3();
    const [selectedNft, setSelectedNft] = useState();
    const [listings, setListings] = useState([]);
    const router = useRouter();

        // Nft module
    const nftModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/tXFGMDnQyHmJv8Imh5ma0MxDzfNHowzN'
        )
        return sdk.getNFTModule('0x8Bd252fB65F6D8B1B13FE224050491cDD001fd05')
    }, [provider])

    // get all nfts in the collection
    useEffect(() => {
        if (!nftModule) return 
        
        ;(async () => {
            const nfts = await nftModule.getAll()

            const selectedNftItem = nfts.find(
                (nft) => nft.id === router.query.nftId);

            setSelectedNft(selectedNftItem)
        }) ();
    }, [nftModule]);

    // Market place Module
    const marketPlaceModule = useMemo(() => {
        if (!provider) return 

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/tXFGMDnQyHmJv8Imh5ma0MxDzfNHowzN'
        )
        return sdk.getMarketplaceModule(
            '0x89732B03a50E994Af71F1A4F7E4e9F27C5Fcd59F'
        )
    }, [provider])

    // useEffect to load marketplace
    useEffect(() => {
        if (!marketPlaceModule) return;

        ;(async () => {
            setListings(await marketPlaceModule.getAllListings)
        })
    }, [marketPlaceModule]);

    return (
        <div>
            <Header/> 
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.topContent}>
                        <div className={style.nftImageContainer}>
                            <NFTImage
                            selectedNft = {selectedNft}/>
                        </div>
                        <div className={style.detailsContainer}>
                            <GeneralDetails
                            selectedNft={selectedNft}/>
                        </div>
                    </div>
                    <ItemActivity/>
                </div>
            </div>
            
        </div>
    )
}   

export default Nft