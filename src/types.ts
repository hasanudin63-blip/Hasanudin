export type DocumentType =
  | "RPP Kemendikdasmen"
  | "RPP Cinta Kemenag"
  | "Asesmen Lengkap"
  | "Jurnal Harian"
  | "Analisis CP"
  | "LKPD Interaktif"
  | "Artikel Referensi";

export interface Subject {
  id: string;
  name: string;
}

export interface ClassGrade {
  id: string;
  name: string;
  fase: string;
}

export interface ComparisonRow {
  aspect: string;
  manual: string;
  siapGuru: string;
}

export interface DocumentFeature {
  type: DocumentType;
  title: string;
  desc: string;
  badge?: string;
  badgeColor?: string;
  iconName: string;
}
