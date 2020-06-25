import { TRADE_GOODS } from './constants';
import _ from 'lodash';


export const createDockingAreas = (map) => {
	let id = 0;
	const typesArray = ['Planet', 'Space Station', 'Asteroid Base'];
	const spaceTypeArray = [{name: 'Solar System', value: 'solarSystem'}, {name: 'Open Space', value: 'openSpace'}, {name: 'Asteroid Belt', value: 'asteroidBelt'}];

	

	function addTradeGoods () {
		const tgCopy = _.cloneDeep(TRADE_GOODS);
		const tradeGoodsTypesCount = tgCopy.length;
		let tradeGoods = [];
		// const guaranteedGoodIndex = Math.floor(Math.random() * Math.floor(tradeGoodsTypesCount));

		// tradeGoods.push(tgCopy[guaranteedGoodIndex]);

		let currentIndex = tgCopy.length, temporaryValue, randomIndex;
		 while (0 !== currentIndex) {
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    temporaryValue = tgCopy[currentIndex];
		    tgCopy[currentIndex] = tgCopy[randomIndex];
		    tgCopy[randomIndex] = temporaryValue;
	    
		 }


		 let randomGoodIndex = Math.floor(Math.random() * Math.floor(tradeGoodsTypesCount));
		 while (0 !== randomGoodIndex) {
		 	let tradeGoodItem = tgCopy[randomGoodIndex];
		 	let buyOrSell = _.sample([true, false]);
		 	const min = Math.ceil(tradeGoodItem.minPrice);
		  	const max = Math.floor(tradeGoodItem.maxPrice);
		  	const price = Math.floor(Math.random() * (max - min + 1)) + min;
		  	const amount = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
		  	tradeGoodItem.amount = amount;
		 	if(buyOrSell === true) {
		 	
		  		tradeGoodItem.sellPrice = price;
		  	} else if (buyOrSell !== true) {
		  	
		  		tradeGoodItem.buyPrice = price;
		  	}
		 	randomGoodIndex -= 1;
		 	tradeGoods.push(tradeGoodItem);
		 }

		return tradeGoods
	}

	map.map(m => {
	
		m.dockingArea = [];
		m.sectorType = [];
		m.sectorType.push(spaceTypeArray[1]);

		const randomNum = Math.floor(Math.random() * Math.floor(11));

		if (randomNum >= 10) {
			m.sectorType[0] = spaceTypeArray[2];  // asteroid
		} else if (randomNum >= 8 && randomNum < 10) {
			m.sectorType[0] = spaceTypeArray[0]; // solar system
		} else {
			m.sectorType[0] = spaceTypeArray[1]; // open space
		}

		if (randomNum >= 9) {
			id++;
			const typeNum = Math.floor(Math.random() * Math.floor(3));
			// console.log('typeNum', typeNum);
			
			const type = typesArray[typeNum];
			const tradeGoods = addTradeGoods();
			let dockingArea = {id: id, type: type, tradeGoods: tradeGoods};
       
			m.sectorType[0] = spaceTypeArray[typeNum];
			m.dockingArea.push(dockingArea);
		}
			

	})

	return map
}

