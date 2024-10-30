from flask import Flask, request, jsonify
import time
app = Flask(__name__)

@app.route("/api/python", methods=["POST"])
def get_route():
    data = request.json
    origen = data.get("paradaOrigen")
    destino = data.get("paradaDestino")
    
    
    
    
    
    ruta = [origen, "lima", "avdemayo", "moreno", "independencia", destino]
    tiempos = [1, 2, 3, 4, 1]
    
    return jsonify({"ruta": ruta, "tiempos": tiempos})

if __name__ == '__main__':
    app.run(debug=True)