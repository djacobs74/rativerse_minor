import { TRADE_GOODS } from './constants';
import _ from 'lodash';


export const createDockingAreas = (map) => {
	let id = 0;
	const typesArray = ['Planet', 'Space Station', 'Asteroid Base'];
	const spaceTypeArray = [{name: 'Solar System', value: 'solarSystem'}, {name: 'Open Space', value: 'openSpace'}, {name: 'Asteroid Belt', value: 'asteroidBelt'}];

	function addTradeGoods () {
		const tradeGoodsTypesCount = TRADE_GOODS.length;
		let tradeGoods = [];
		const guaranteedGoodIndex = Math.floor(Math.random() * Math.floor(tradeGoodsTypesCount));

		tradeGoods.push(TRADE_GOODS[guaranteedGoodIndex]);

		TRADE_GOODS.map(t => {
			const randomGoodIndex = Math.floor(Math.random() * Math.floor(tradeGoodsTypesCount));
			if(randomGoodIndex > guaranteedGoodIndex ) {
				if(t !== TRADE_GOODS[guaranteedGoodIndex]) {
					tradeGoods.push(t);
				}
			}
		})

		tradeGoods.map(p => {
			// THIS WORKS, BUT FOR SOME REASON ITS LOOPING THROUGH THIS MORE THAN ONCE . . .
			if ( !(('buyPrice' in p) || ('sellPrice' in p)) ) {
				// debugger;
				const torF = _.sample([true, false]);
				console.log('torF ', typeof torF );
				const min = Math.ceil(p.minPrice);
			  	const max = Math.floor(p.maxPrice);
			  	const price = Math.floor(Math.random() * (max - min + 1)) + min;
			  	if(torF === true) {
			  		// debugger;
			  		p.sellPrice = price;
			  	} else if (torF !== true) {
			  		// debugger;
			  		p.buyPrice = price;
			  	}
			}

		})
		// console.log('TRADE GOODS', tradeGoods);
		return tradeGoods
	}


	map.map(m => {
		m.dockingArea = [];
		m.sectorType = [];
		m.sectorType.push(spaceTypeArray[1]);
		
		const addDockingArea = Math.floor(Math.random() * Math.floor(11));
		if (addDockingArea >= 9) {
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

