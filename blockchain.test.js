const Block = require('./block');

const Blockchain = require('./blockchain');


describe('Blockchain', () =>{
	let bc, bc2;

	beforeEach(() => {
		bc = new Blockchain();
		bc2 = new Blockchain();
	});

	it('starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
	});

	it('adds a new block', () => {
        const data = 'foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).toEqual(data);

	});
	

	it('valiates a valid chain', () => {
       bc2.addBlock('foo');

       expect(bc.isValidChain(bc2.chain)).toBe(true);
	})

	it('invlidates a chain with a corrupt genesis block', () => {
		bc2.chain[0].data ='modified';

		expect(bc.isValidChain(bc2.chain)).toBe(false);
	})

	it('invlidates a corrupt chain', () => {
		bc2.addBlock('foo');
		bc2.chain[1].data = 'bad data';

		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});
})

