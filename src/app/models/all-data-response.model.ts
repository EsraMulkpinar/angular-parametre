export interface AllDataResponse {
    objectIdFieldName: string;
    uniqueIdField:     UniqueIDField;
    globalIdFieldName: string;
    geometryType:      string;
    spatialReference:  SpatialReference;
    fields:            Field[];
    features:          Feature[];
}

export interface Feature {
    attributes: Attributes;
    geometry:   Geometry;
}

export interface Attributes {
    FID:          number;
    Tree_ID:      number;
    Collected:    number;
    Crew:         string;
    Status:       Status;
    Spp_Code:     string;
    Land_Use:     LandUse;
    Ht_DBH_ft:    number;
    DBH1:         number;
    DBH2:         number;
    DBH3:         number;
    DBH4:         number;
    DBH5:         number;
    DBH6:         string;
    Height:       number;
    Live_Top:     number;
    Crown_Base:   number;
    Width_NS:     number;
    Width_EW:     number;
    Cn_Missing:   number;
    Cn_DieBack:   number;
    CLE:          number;
    Tree_Site:    TreeSite;
    Tree_Age:     string;
    Notes:        Notes;
    Cmn_Name:     string;
    Sci_Name:     string;
    GroundArea:   number;
    Condition:    Condition;
    Leaf_Area:    number;
    Leaf_Bmass:   number;
    LAI:          number;
    C_Storage:    number;
    C_Seq:        number;
    S_Value:      string;
    Street:       Native;
    Native:       Native;
    CO_Rmvd:      number;
    O3_Rmvd:      number;
    NO2_Rmvd:     number;
    PM10_Rmvd:    number;
    SO2_Rmvd:     number;
    PM2p5_Rmvd:   number;
    CO_RVlu:      number;
    O3_Rvlu:      number;
    NO2_Rvlu:     number;
    PM10_Rvlu:    number;
    SO2_Rvlu:     number;
    PM2p5_RVlu:   number;
    Isoprene_E:   number;
    Monoterp_E:   number;
    Vocs_E:       number;
    Dedication:   string;
    Longitude:    number;
    Latitude:     number;
    Crown_Height: number;
}

export enum Condition {
    Critical = "Critical",
    Empty = " ",
    Excellent = "Excellent",
    Fair = "Fair",
    Good = "Good",
    Poor = "Poor",
}

export enum LandUse {
    C = "C",
    I = "I",
}

export enum Native {
    Empty = " ",
    No = "NO",
    Yes = "YES",
}

export enum Notes {
    Cut012813DueToHeartRot = "Cut 01/28/13 due to heart rot",
    Empty = " ",
    QuercusGlandulifera = "Quercus Glandulifera",
    Removed012813 = "Removed 01/28/13",
}

export enum Status {
    I = "I",
    P = "P",
    U = "U",
}

export enum TreeSite {
    N = "N",
    S = "S",
}

export interface Geometry {
    x: number;
    y: number;
}

export interface Field {
    name:         string;
    type:         Type;
    alias:        string;
    sqlType:      SQLType;
    domain:       null;
    defaultValue: null;
    length?:      number;
}

export enum SQLType {
    SQLTypeFloat = "sqlTypeFloat",
    SQLTypeInteger = "sqlTypeInteger",
    SQLTypeNVarchar = "sqlTypeNVarchar",
    SQLTypeOther = "sqlTypeOther",
    SQLTypeTimestamp2 = "sqlTypeTimestamp2",
}

export enum Type {
    EsriFieldTypeDate = "esriFieldTypeDate",
    EsriFieldTypeDouble = "esriFieldTypeDouble",
    EsriFieldTypeInteger = "esriFieldTypeInteger",
    EsriFieldTypeOID = "esriFieldTypeOID",
    EsriFieldTypeString = "esriFieldTypeString",
}

export interface SpatialReference {
    wkid:       number;
    latestWkid: number;
}

export interface UniqueIDField {
    name:               string;
    isSystemMaintained: boolean;
}
