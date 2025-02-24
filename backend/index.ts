import { notEqual } from 'assert';
import dotenv from 'dotenv';
import Database from './models/database';

dotenv.config(); // Cargar variables de entorno

const database = new Database;