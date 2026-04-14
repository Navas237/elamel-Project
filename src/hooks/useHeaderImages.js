import { useQuery } from "@tanstack/react-query"; 
import { supabase } from "../services/SupabaseClient";


export const useHeaderImages = () => {
    return useQuery({
        queryKey : ["headerImages"],
            queryFn : async () => {
            const { data, error } = await supabase
                .from('ImhHeader')
                .select('*')

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
 };

 