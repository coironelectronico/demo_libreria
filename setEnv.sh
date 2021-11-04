mkdir env
echo "export const environment = { sheet_api_key : '$1' }"  > env/env.ts
- run: sh setEnvironment.sh ${{ secrets.SHEET_API_KEY }}
echo "export const environment = { book_api_key : '$1' }"  > env/env.ts
- run: sh setEnvironment.sh ${{ secrets.BOOK_API_KEY }}
