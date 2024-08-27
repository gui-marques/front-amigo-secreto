import { SearchResult } from "@/types/SearchResult"

type Props = {
    results: SearchResult;
}
export const SearchReveal = ({ results }: Props) => {
    const handleVoltar = () => {        
            window.location.href = '/event/1';  
    }
 
    return (
        <div>
            <p className="text-3xl">{results.person.name}</p>
            <p className="text-2xl my-3">parabéns, você tirou:</p>
            <p className="text-4xl bg-blue-800 my-5 px-5 py-20 rounded-lg
            border-2 border-dashed border-blue-300">{results.personMatched.name} - {results.personMatched.setor}</p>    
              <button
                className="w-full p-3 mt-3 rounded-lg bg-blue-800 text-white text-4xl border-b-4 border-blue-600 active:border-0"
                onClick={handleVoltar}
            >
                Voltar
            </button>
        </div>
    );
}