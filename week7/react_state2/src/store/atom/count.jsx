// to define out our count file here 
// this reduce the re-render as the contex api and prop drilling make the re-rendiring more and this is how it being 
// reduced with the help of this here 
import { atom, selector } from 'recoil';

export const countAtom = atom({ // atom expect single object as input then we can put the values inside of it 
    key : 'countAtom',  // make sure each atom have diffrent name 
    default: 0
});

export const evenSelector = selector({
    key : 'evenSelector',
    get : (props) => {
        const count = props.get(countAtom);
        return count % 2;
    }
});
