export function scrollWindowToTop() {
	let scrollToTop = window.setInterval(() => {
		let pos = window.pageYOffset;
		if (pos > 0) {
			window.scrollTo(0, pos - 20); // how far to scroll on each step
		} else {
			window.clearInterval(scrollToTop);
		}
	}, 16);
}

export class Message {
	content: string;
	style: string;
	dismissed: any;
	button1: object;
	button2: object;

	constructor(
		content: string,
		style: string,
		dismissed: any,
		button1?: object,
		button2?: object
	) {
		this.content = content;
		this.style = style || 'info';
		this.dismissed = dismissed;
		this.button1 = button1 || {};
		this.button2 = button2 || {};
	}
}

export function _addToCart(product: any, qtys: number) {
	if (qtys == 0) return false;

	let cart = JSON.parse(localStorage.getItem('cart')!);

	let haveThis = 0;

	if (cart && cart.items != undefined) {
		for (var i = 0; i < cart.items.length; ++i) {
			if (product.id == cart.items[i].id) {
				cart.qty = Number(cart.qty) - Number(cart.items[i].qty) + Number(qtys);
				cart.items[i].qty = Number(qtys);
				haveThis = 1;
			}
		}
	}

	if (haveThis == 0) {
		let item: any = {
			id: product.id,
			client_code: product.client_code,
			name: product.name,
			arabic_name: product.name_ar,
			qty: qtys,
		};

		if (cart && cart.items != undefined) {
			cart.qty = Number(cart.qty) + Number(qtys);
			cart.items.push(item);
		} else {
			cart = { items: [item], qty: qtys };
		}
	}

	localStorage.setItem('cart', JSON.stringify(cart));

	return cart;
}

export function _changeQty(id: number, input: any, carts: any) {
	let diff = 0;
	carts.items.forEach((item: any, index: any, object: any) => {
		if (item.id == id) {
			diff = Number(input.value) - Number(item.qty);
			item.qty = input.value;
		}
	});
	carts.qty = Number(carts.qty) + Number(diff);
	localStorage.setItem('cart', JSON.stringify(carts));
	return carts;
}

export function _confirmRemoveItem(id: number, carts: any) {
	let diff = 0;
	carts.items.forEach((item: any, index: any, object: any) => {
		if (item.id == id) {
			diff = item.qty;
			object.splice(index, 1);
		}
	});
	carts.qty = Number(carts.qty) - Number(diff);
	if (carts.items.length == 0) {
		localStorage.removeItem('cart');
		carts = undefined;
	} else {
		localStorage.setItem('cart', JSON.stringify(carts));
	}
	return carts;
}

export function _addExistProduct(items: any, carts: any) {
	let qty: number = 0;
	for (let i = 0; i < items.length; i++) {
		let item: any = {
			id: items[i].id,
			client_code: items[i].client_code,
			name: items[i].name,
			arabic_name: items[i].arabic_name,
			qty: items[i].qty,
		};
		qty = qty + Number(items[i].qty);
		if (carts && carts.items != undefined) {
			carts.items.push(item);
		} else {
			carts = { items: [item] };
		}
	}
	carts.qty = qty;

	localStorage.setItem('cart', JSON.stringify(carts));

	return carts;
}
