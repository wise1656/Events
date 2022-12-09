// создает новый тип у которого заменяет тип поля Field на новый 
// если это массив, нужно передать тип number
export type ReplaceFieldType<T, Field extends keyof any, NewType> = Omit<T, Field> & {
    [P in Field]: NewType;
};

// создает новый тип у которого заменяет тип поля на 2 уровне вложенности
export type ReplaceFieldType2<
    T,
    FieldLevel1 extends keyof T,
    FieldLevel2 extends keyof T[FieldLevel1],
    NewType,
> = ReplaceFieldType<T, FieldLevel1, ReplaceFieldType<T[FieldLevel1], FieldLevel2, NewType>>;

// создает новый тип у которого заменяет тип поля на 3 уровне вложенности
export type ReplaceFieldType3<
    T,
    FieldLevel1 extends keyof T,
    FieldLevel2 extends keyof T[FieldLevel1],
    FieldLevel3 extends keyof T[FieldLevel1][FieldLevel2],
    NewType,
> = ReplaceFieldType2<
    T,
    FieldLevel1,
    FieldLevel2,
    ReplaceFieldType<T[FieldLevel1][FieldLevel2], FieldLevel3, NewType>
>;
